// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');
const { TranslationSettings } = require('../translation/translationSettings');

const englishEnglish = TranslationSettings.englishEnglish;
const englishSpanish = TranslationSettings.englishSpanish;
const spanishEnglish = TranslationSettings.spanishEnglish;
// const spanishSpanish = TranslationSettings.spanishSpanish;

class DialogBot extends ActivityHandler {
    /**
     *
     * @param {ConversationState} conversationState
     * @param {UserState} userState
     * @param {Dialog} dialog
     * @param {Object} languagePreferenceProperty Accessor for language preference property in the user state.
     */
    constructor(conversationState, userState, dialog, languagePreferenceProperty) {
        super();
        if (!conversationState) throw new Error('[DialogBot]: Missing parameter. conversationState is required');
        if (!userState) throw new Error('[DialogBot]: Missing parameter. userState is required');
        if (!dialog) throw new Error('[DialogBot]: Missing parameter. dialog is required');
        if (!languagePreferenceProperty) throw new Error('[MultilingualBot]: Missing parameter. languagePreferenceProperty is required');

        this.conversationState = conversationState;
        this.userState = userState;
        this.dialog = dialog;
        this.dialogState = this.conversationState.createProperty('DialogState');
        this.languagePreferenceProperty = languagePreferenceProperty;

        this.onMessage(async (context, next) => {
            console.log('Running dialog with Message Activity.');

            const currentLang = context.activity.text.toLowerCase();
            const lang = currentLang === englishEnglish || currentLang === spanishEnglish ? englishEnglish : englishSpanish;

            // Get the user language preference from the user state.
            await this.languagePreferenceProperty.set(context, lang);

            // Run the Dialog with the new message Activity.
            await this.dialog.run(context, this.dialogState);

            await next();
        });
    }

    /**
     * Override the ActivityHandler.run() method to save state changes after the bot logic completes.
     */
    async run(context) {
        await super.run(context);

        // Save any state changes. The load happened during the execution of the Dialog.
        await this.conversationState.saveChanges(context, false);
        await this.userState.saveChanges(context, false);
    }
}

module.exports.DialogBot = DialogBot;
