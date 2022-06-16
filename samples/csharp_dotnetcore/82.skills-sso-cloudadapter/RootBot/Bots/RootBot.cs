// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Schema;

namespace Microsoft.BotBuilderSamples.RootBot.Bots
{
#pragma warning disable CA1724 // Type names should not match namespaces (by design and we can't change this without breaking binary compat).
    public class RootBot<T> : ActivityHandler
#pragma warning restore CA1724
        where T : Dialog
    {
        private readonly ConversationState _conversationState;
        private readonly Dialog _mainDialog;

        public RootBot(ConversationState conversationState, T dialog)
        {
            _conversationState = conversationState ?? throw new ArgumentNullException(nameof(conversationState));
            _mainDialog = dialog ?? throw new ArgumentNullException(nameof(dialog));
        }

        public override async Task OnTurnAsync(ITurnContext turnContext, CancellationToken cancellationToken = default)
        {
            if (turnContext.Activity.Type != ActivityTypes.ConversationUpdate)
            {
                // Run the Dialog with the Activity.
                await _mainDialog.RunAsync(turnContext, _conversationState.CreateProperty<DialogState>("DialogState"), cancellationToken).ConfigureAwait(false);
            }
            else
            {
                // Let the base class handle the activity.
                await base.OnTurnAsync(turnContext, cancellationToken).ConfigureAwait(false);
            }

            // Save any state changes that might have occurred during the turn.
            await _conversationState.SaveChangesAsync(turnContext, false, cancellationToken).ConfigureAwait(false);
        }

        protected override async Task OnMembersAddedAsync(IList<ChannelAccount> membersAdded, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
        {
            foreach (var member in membersAdded)
            {
                // Greet anyone that was not the target (recipient) of this message.
                if (member.Id != turnContext.Activity.Recipient.Id)
                {
                    await turnContext.SendActivityAsync(MessageFactory.Text("Hello and welcome!"), cancellationToken).ConfigureAwait(false);
                    await _mainDialog.RunAsync(turnContext, _conversationState.CreateProperty<DialogState>("DialogState"), cancellationToken).ConfigureAwait(false);
                }
            }
        }
    }
}
