/* Creekside V3 state engine.
   Plain browser JavaScript keeps the no-build deployment model intact and
   makes progression/persistence logic testable without rendering React. */
(function () {
  "use strict";

  function getConfig() {
    return window.CREEKSIDE_CONFIG;
  }

  function unique(values) {
    return Array.from(new Set(values));
  }

  function initialState() {
    var config = getConfig();
    var firstChapter = config.chapters[0];
    return {
      version: config.version,
      view: "splash",
      activeFlow: "chapter",
      trainer: {
        name: "",
        avatarId: config.avatars[0].id,
      },
      currentChapterId: firstChapter.id,
      currentSceneIndex: 0,
      currentSceneId: firstChapter.scenes[0].id,
      completedChapters: [],
      earnedRewards: [],
      earnedBadges: [],
      team: [],
      inventory: [],
      questItems: [],
      collectedFragments: [],
      checkpointComplete: false,
      championEndingComplete: false,
      mewUnlocked: false,
      fakeCreditsComplete: false,
      mewComplete: false,
      updatedAt: null,
    };
  }

  function chapterById(chapterId) {
    return getConfig().chapters.find(function (chapter) {
      return chapter.id === chapterId;
    });
  }

  function activeSequence(state) {
    if (state.activeFlow === "mew") return getConfig().epilogue;
    if (state.activeFlow === "checkpoint") return getConfig().checkpoint;
    return chapterById(state.currentChapterId);
  }

  function currentScene(state) {
    var sequence = activeSequence(state);
    return sequence && sequence.scenes[state.currentSceneIndex];
  }

  function validAudience(scene) {
    return scene && getConfig().audiences.indexOf(scene.audience) !== -1;
  }

  function nearestSafeSceneIndex(sequence, requestedIndex) {
    var bounded = Math.min(Math.max(Number.isInteger(requestedIndex) ? requestedIndex : 0, 0), sequence.scenes.length - 1);
    if (validAudience(sequence.scenes[bounded])) return bounded;
    for (var index = bounded; index >= 0; index -= 1) {
      if (sequence.scenes[index] && sequence.scenes[index].audience === "luca") return index;
    }
    return 0;
  }

  function migrateV2SceneIndex(sequence, legacyIndex) {
    var legacyIds = Array.isArray(sequence.legacyV2SceneIds)
      ? sequence.legacyV2SceneIds
      : sequence.scenes.map(function (scene) { return scene.id; });
    var boundedLegacyIndex = Math.min(
      Math.max(Number.isInteger(legacyIndex) ? legacyIndex : 0, 0),
      Math.max(0, legacyIds.length - 1)
    );
    var legacySceneId = legacyIds[boundedLegacyIndex];
    var aliasedSceneId = sequence.sceneAliases && sequence.sceneAliases[legacySceneId];
    if (aliasedSceneId) {
      var aliasedIndex = sequence.scenes.findIndex(function (scene) {
        return scene.id === aliasedSceneId && scene.audience === "luca";
      });
      if (aliasedIndex !== -1) return aliasedIndex;
    }
    var handoffIndex = sequence.scenes.findIndex(function (scene) {
      return scene.id === legacySceneId + "-handoff" && scene.audience === "luca";
    });
    if (handoffIndex !== -1) return handoffIndex;

    var exactIndex = sequence.scenes.findIndex(function (scene) {
      return scene.id === legacySceneId;
    });
    if (exactIndex !== -1 && sequence.scenes[exactIndex].audience === "luca") return exactIndex;

    for (var legacyCursor = boundedLegacyIndex; legacyCursor >= 0; legacyCursor -= 1) {
      var precedingIndex = sequence.scenes.findIndex(function (scene) {
        return scene.id === legacyIds[legacyCursor] && scene.audience === "luca";
      });
      if (precedingIndex !== -1) return precedingIndex;
    }
    return nearestSafeSceneIndex(sequence, 0);
  }

  function resolveSceneIndex(sequence, input) {
    var requestedId = typeof input.currentSceneId === "string" ? input.currentSceneId : "";
    if (requestedId) {
      var sceneIdIndex = sequence.scenes.findIndex(function (scene) {
        return scene.id === requestedId;
      });
      if (sceneIdIndex !== -1 && validAudience(sequence.scenes[sceneIdIndex])) return sceneIdIndex;
      var aliasedSceneId = sequence.sceneAliases && sequence.sceneAliases[requestedId];
      if (aliasedSceneId) {
        var aliasedIndex = sequence.scenes.findIndex(function (scene) {
          return scene.id === aliasedSceneId;
        });
        if (aliasedIndex !== -1 && validAudience(sequence.scenes[aliasedIndex])) return aliasedIndex;
      }
    }
    if (input.version === 2) return migrateV2SceneIndex(sequence, input.currentSceneIndex);
    return nearestSafeSceneIndex(sequence, input.currentSceneIndex);
  }

  function syncScenePosition(state) {
    var sequence = activeSequence(state);
    if (!sequence || !sequence.scenes.length) return state;
    var index = nearestSafeSceneIndex(sequence, state.currentSceneIndex);
    return Object.assign({}, state, {
      currentSceneIndex: index,
      currentSceneId: sequence.scenes[index].id,
    });
  }

  function validStringArray(input, allowedValues) {
    if (!Array.isArray(input)) return [];
    return unique(input.filter(function (value) {
      return allowedValues.indexOf(value) !== -1;
    }));
  }

  function sanitizeState(input) {
    var config = getConfig();
    var fallback = initialState();
    if (!input || typeof input !== "object" || [2, config.version].indexOf(input.version) === -1) return fallback;

    var chapterIds = config.chapters.map(function (chapter) { return chapter.id; });
    var rewardIds = Object.keys(config.rewards);
    var fragmentSlots = config.codeFragments.map(function (fragment) { return fragment.slot; });
    var avatarIds = config.avatars.map(function (avatar) { return avatar.id; });
    var completedChapters = validStringArray(input.completedChapters, chapterIds);
    var earnedRewards = validStringArray(input.earnedRewards, rewardIds);
    var derivedTeam = earnedRewards.filter(function (rewardId) {
      return config.rewards[rewardId].category === "team-card";
    });
    var derivedBadges = earnedRewards.filter(function (rewardId) {
      return config.rewards[rewardId].category === "badge";
    });
    var derivedQuestItems = earnedRewards.filter(function (rewardId) {
      return config.rewards[rewardId].category === "quest-item";
    });
    var derivedInventory = earnedRewards.filter(function (rewardId) {
      return ["team-card", "badge", "quest-item"].indexOf(config.rewards[rewardId].category) === -1;
    });
    var currentChapterId = chapterIds.indexOf(input.currentChapterId) !== -1
      ? input.currentChapterId
      : config.chapters[0].id;
    var activeFlowValue = ["chapter", "checkpoint", "mew"].indexOf(input.activeFlow) !== -1 ? input.activeFlow : "chapter";
    var selectedSequence = activeFlowValue === "mew"
      ? config.epilogue
      : activeFlowValue === "checkpoint"
        ? config.checkpoint
        : chapterById(currentChapterId);
    var sceneIndex = resolveSceneIndex(selectedSequence, input);
    var allowedViews = ["splash", "onboarding", "map", "scene", "celebration"];
    var finalChapterId = config.chapters[config.chapters.length - 1].id;
    var championEndingComplete = Boolean(
      input.championEndingComplete || completedChapters.indexOf(finalChapterId) !== -1
    );
    var mewUnlocked = Boolean(
      input.mewUnlocked || input.mewComplete || input.activeFlow === "mew"
    );

    if (activeFlowValue === "mew" && !mewUnlocked) {
      activeFlowValue = "chapter";
      selectedSequence = chapterById(currentChapterId);
      sceneIndex = nearestSafeSceneIndex(selectedSequence, sceneIndex);
    }

    return {
      version: config.version,
      view: allowedViews.indexOf(input.view) !== -1 ? input.view : fallback.view,
      activeFlow: activeFlowValue,
      trainer: {
        name: input.trainer && typeof input.trainer.name === "string"
          ? input.trainer.name.slice(0, 40)
          : "",
        avatarId: input.trainer && avatarIds.indexOf(input.trainer.avatarId) !== -1
          ? input.trainer.avatarId
          : config.avatars[0].id,
      },
      currentChapterId: currentChapterId,
      currentSceneIndex: sceneIndex,
      currentSceneId: selectedSequence.scenes[sceneIndex].id,
      completedChapters: completedChapters,
      earnedRewards: earnedRewards,
      earnedBadges: Array.isArray(input.earnedBadges) ? validStringArray(input.earnedBadges, rewardIds) : derivedBadges,
      team: Array.isArray(input.team) ? validStringArray(input.team, rewardIds) : derivedTeam,
      inventory: Array.isArray(input.inventory) ? validStringArray(input.inventory, rewardIds) : derivedInventory,
      questItems: Array.isArray(input.questItems) ? validStringArray(input.questItems, rewardIds) : derivedQuestItems,
      collectedFragments: Array.isArray(input.collectedFragments)
        ? unique(input.collectedFragments.filter(function (slot) {
            return fragmentSlots.indexOf(slot) !== -1;
          }))
        : [],
      checkpointComplete: Boolean(input.checkpointComplete),
      championEndingComplete: championEndingComplete,
      mewUnlocked: mewUnlocked,
      fakeCreditsComplete: Boolean(input.fakeCreditsComplete),
      mewComplete: Boolean(input.mewComplete && mewUnlocked),
      updatedAt: typeof input.updatedAt === "string" ? input.updatedAt : null,
    };
  }

  function readState() {
    var config = getConfig();
    try {
      var stored = window.localStorage.getItem(config.storageKey);
      if (!stored) return initialState();
      return sanitizeState(JSON.parse(stored));
    } catch (error) {
      try {
        window.localStorage.removeItem(config.storageKey);
      } catch (removeError) {
        // Storage may be disabled. The in-memory initial state remains usable.
      }
      return initialState();
    }
  }

  function writeState(state) {
    try {
      window.localStorage.setItem(getConfig().storageKey, JSON.stringify(state));
      return true;
    } catch (error) {
      return false;
    }
  }

  function clearState() {
    try {
      window.localStorage.removeItem(getConfig().storageKey);
    } catch (error) {
      // A reset still succeeds in memory when browser storage is unavailable.
    }
  }

  function withSceneEffects(state, scene) {
    var config = getConfig();
    var next = Object.assign({}, state);
    if (Array.isArray(scene.rewardIds)) {
      next.earnedRewards = unique(state.earnedRewards.concat(scene.rewardIds));
      scene.rewardIds.forEach(function (rewardId) {
        var item = config.rewards[rewardId];
        if (!item) return;
        if (item.category === "team-card") next.team = unique(next.team.concat(rewardId));
        else if (item.category === "badge") next.earnedBadges = unique(next.earnedBadges.concat(rewardId));
        else if (item.category === "quest-item") next.questItems = unique(next.questItems.concat(rewardId));
        else next.inventory = unique(next.inventory.concat(rewardId));
      });
    }
    if (Number.isInteger(scene.fragmentSlot)) {
      next.collectedFragments = unique(state.collectedFragments.concat(scene.fragmentSlot));
    }
    if (scene.type === "fake-credits") next.fakeCreditsComplete = true;
    return next;
  }

  function advance(state, allowPhysicalOverride) {
    if (state.view !== "scene") return state;
    var sequence = activeSequence(state);
    var scene = currentScene(state);
    if (!sequence || !scene) return state;
    if (["physical-challenge", "cast-handoff", "cast-cue"].indexOf(scene.type) !== -1 && !allowPhysicalOverride) return state;

    var next = withSceneEffects(state, scene);
    if (state.currentSceneIndex < sequence.scenes.length - 1) {
      var nextScene = sequence.scenes[state.currentSceneIndex + 1];
      if (nextScene.type === "champion-final") {
        var endingCompleted = unique(next.completedChapters.concat(state.currentChapterId));
        return Object.assign({}, next, {
          currentSceneIndex: state.currentSceneIndex + 1,
          currentSceneId: nextScene.id,
          completedChapters: endingCompleted,
          championEndingComplete: true,
          mewUnlocked: state.mewComplete ? true : false,
        });
      }
      return Object.assign({}, next, {
        currentSceneIndex: state.currentSceneIndex + 1,
        currentSceneId: sequence.scenes[state.currentSceneIndex + 1].id,
      });
    }

    if (state.activeFlow === "mew") {
      return Object.assign({}, next, {
        view: "celebration",
        mewComplete: true,
      });
    }

    if (state.activeFlow === "checkpoint") {
      return Object.assign({}, next, {
        view: "map",
        activeFlow: "chapter",
        currentSceneIndex: 0,
        currentSceneId: chapterById(state.currentChapterId).scenes[0].id,
        checkpointComplete: true,
      });
    }

    var config = getConfig();
    var completed = unique(next.completedChapters.concat(state.currentChapterId));
    var currentIndex = config.chapters.findIndex(function (chapter) {
      return chapter.id === state.currentChapterId;
    });
    var nextChapter = config.chapters[currentIndex + 1];
    var championComplete = state.currentChapterId === config.chapters[config.chapters.length - 1].id;
    var checkpointRequired = state.currentChapterId === config.checkpoint.afterChapterId;
    if (championComplete) {
      return state.championEndingComplete ? state : Object.assign({}, next, {
        completedChapters: completed,
        championEndingComplete: true,
        mewUnlocked: false,
      });
    }
    return Object.assign({}, next, {
      view: "map",
      activeFlow: checkpointRequired ? "checkpoint" : "chapter",
      currentChapterId: nextChapter ? nextChapter.id : state.currentChapterId,
      currentSceneIndex: 0,
      currentSceneId: nextChapter ? nextChapter.scenes[0].id : sequence.scenes[0].id,
      completedChapters: completed,
      mewUnlocked: state.mewUnlocked,
    });
  }

  function reducer(state, action) {
    var next = state;
    switch (action.type) {
      case "START_ONBOARDING":
        next = Object.assign({}, state, { view: "onboarding" });
        break;
      case "SET_TRAINER":
        next = Object.assign({}, state, {
          view: "map",
          trainer: {
            name: action.name,
            avatarId: action.avatarId,
          },
        });
        break;
      case "OPEN_CURRENT_CHAPTER":
        var currentChapter = chapterById(state.currentChapterId);
        var fragmentsReady = !currentChapter.requiresFragments
          || state.collectedFragments.length >= currentChapter.requiresFragments;
        var checkpointReady = !currentChapter.requiresCheckpoint || state.checkpointComplete;
        if (state.completedChapters.indexOf(state.currentChapterId) === -1 && fragmentsReady && checkpointReady) {
          next = Object.assign({}, state, {
            view: "scene",
            activeFlow: "chapter",
          });
        }
        break;
      case "OPEN_CHECKPOINT":
        if (!state.checkpointComplete && state.completedChapters.indexOf(getConfig().checkpoint.afterChapterId) !== -1) {
          next = Object.assign({}, state, {
            view: "scene",
            activeFlow: "checkpoint",
            currentSceneIndex: state.activeFlow === "checkpoint" ? state.currentSceneIndex : 0,
            currentSceneId: state.activeFlow === "checkpoint"
              ? state.currentSceneId
              : getConfig().checkpoint.scenes[0].id,
          });
        }
        break;
      case "OPEN_MEW":
        if (state.mewUnlocked) {
          next = Object.assign({}, state, {
            view: state.mewComplete ? "celebration" : "scene",
            activeFlow: "mew",
            currentSceneIndex: state.mewComplete ? getConfig().epilogue.scenes.length - 1 : 0,
            currentSceneId: state.mewComplete
              ? getConfig().epilogue.scenes[getConfig().epilogue.scenes.length - 1].id
              : getConfig().epilogue.scenes[0].id,
          });
        }
        break;
      case "ADVANCE_SCENE":
        next = advance(state, false);
        break;
      case "COMPLETE_PHYSICAL":
      case "COMPLETE_RELAY_HOLD":
      case "PARENT_ADVANCE":
        next = advance(state, true);
        break;
      case "BACK_TO_MAP":
        next = Object.assign({}, state, { view: "map" });
        break;
      case "PARENT_JUMP_CHAPTER":
        if (chapterById(action.chapterId)) {
          next = Object.assign({}, state, {
            view: "scene",
            activeFlow: "chapter",
            currentChapterId: action.chapterId,
            currentSceneIndex: 0,
            currentSceneId: chapterById(action.chapterId).scenes[0].id,
          });
        }
        break;
      case "PARENT_JUMP_SCENE":
        var parentChapter = chapterById(action.chapterId);
        if (parentChapter) {
          next = Object.assign({}, state, {
            view: "scene",
            activeFlow: "chapter",
            currentChapterId: action.chapterId,
            currentSceneIndex: Math.min(Math.max(action.sceneIndex || 0, 0), parentChapter.scenes.length - 1),
            currentSceneId: parentChapter.scenes[Math.min(Math.max(action.sceneIndex || 0, 0), parentChapter.scenes.length - 1)].id,
          });
        }
        break;
      case "PARENT_JUMP_CHECKPOINT":
        next = Object.assign({}, state, {
          view: "scene",
          activeFlow: "checkpoint",
          currentSceneIndex: Math.min(Math.max(action.sceneIndex || 0, 0), getConfig().checkpoint.scenes.length - 1),
          currentSceneId: getConfig().checkpoint.scenes[Math.min(Math.max(action.sceneIndex || 0, 0), getConfig().checkpoint.scenes.length - 1)].id,
        });
        break;
      case "PARENT_JUMP_MEW":
        next = Object.assign({}, state, {
          view: "scene",
          activeFlow: "mew",
          currentSceneIndex: Math.min(Math.max(action.sceneIndex || 0, 0), getConfig().epilogue.scenes.length - 1),
          currentSceneId: getConfig().epilogue.scenes[Math.min(Math.max(action.sceneIndex || 0, 0), getConfig().epilogue.scenes.length - 1)].id,
          mewUnlocked: true,
          championEndingComplete: true,
        });
        break;
      case "PARENT_BACK_SCENE":
        if (state.view === "scene" && state.currentSceneIndex > 0) {
          next = Object.assign({}, state, {
            currentSceneIndex: state.currentSceneIndex - 1,
            currentSceneId: activeSequence(state).scenes[state.currentSceneIndex - 1].id,
          });
        }
        break;
      case "PARENT_TRIGGER_MEW":
        if (state.championEndingComplete && !state.mewUnlocked) {
          next = Object.assign({}, state, {
            view: "scene",
            activeFlow: "mew",
            currentSceneIndex: 0,
            currentSceneId: getConfig().epilogue.scenes[0].id,
            mewUnlocked: true,
          });
        }
        break;
      case "PARENT_REARM_MEW":
        if (state.championEndingComplete && !state.mewComplete) {
          var championSequence = getConfig().chapters[getConfig().chapters.length - 1];
          next = Object.assign({}, state, {
            view: "scene",
            activeFlow: "chapter",
            currentChapterId: championSequence.id,
            currentSceneIndex: championSequence.scenes.length - 1,
            currentSceneId: championSequence.scenes[championSequence.scenes.length - 1].id,
            mewUnlocked: false,
          });
        }
        break;
      case "REPLAY_HALL":
        if (state.mewComplete) {
          var finaleSequence = getConfig().chapters[getConfig().chapters.length - 1];
          var hallIndex = finaleSequence.scenes.findIndex(function (scene) {
            return scene.id === "hall-of-heroes";
          });
          if (hallIndex !== -1) {
            next = Object.assign({}, state, {
              view: "scene",
              activeFlow: "chapter",
              currentChapterId: finaleSequence.id,
              currentSceneIndex: hallIndex,
              currentSceneId: finaleSequence.scenes[hallIndex].id,
            });
          }
        }
        break;
      case "PARENT_RESTORE":
        next = sanitizeState(action.state);
        break;
      case "RESET":
        clearState();
        next = initialState();
        break;
      default:
        return state;
    }

    next = syncScenePosition(next);
    return Object.assign({}, next, {
      updatedAt: new Date().toISOString(),
    });
  }

  window.CreeksideState = {
    initialState: initialState,
    sanitizeState: sanitizeState,
    readState: readState,
    writeState: writeState,
    clearState: clearState,
    reducer: reducer,
    chapterById: chapterById,
    activeSequence: activeSequence,
    currentScene: currentScene,
    migrateV2SceneIndex: migrateV2SceneIndex,
  };
})();
