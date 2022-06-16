// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Schema;

namespace Microsoft.BotBuilderSamples
{
    public class ActivityLog
    {
        private IStorage _storage;

        public ActivityLog(IStorage storage)
        {
            _storage = storage;
        }

        public async Task Append(string activityId, Activity activity)
        {
            if (activityId == null)
            {
                throw new ArgumentNullException(nameof(activityId), "ActivityId must be provided.");
            }

            if (activity == null)
            {
                throw new ArgumentNullException(nameof(activity), "Activity must be provided.");
            }

            await _storage.WriteAsync(new Dictionary<string, object> { { activityId, activity } }).ConfigureAwait(false);
        }

        public async Task<Activity> Find(string activityId)
        {
            if (activityId == null)
            {
                throw new ArgumentNullException(nameof(activityId), "ActivityId must be provided.");
            }

            var activities = await _storage.ReadAsync(new[] { activityId }).ConfigureAwait(false);
            return activities.Count >= 1 ? (Activity)activities[activityId] : null;
        }
    }
}
