// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using Microsoft.Bot.Builder.Testing.XUnit;
using Microsoft.BotBuilderSamples;

namespace CoreBot.Tests.Dialogs.TestData
{
    /// <summary>
    /// A class to generate test cases for <see cref="BookingDialogTests"/>.
    /// </summary>
    [SuppressMessage("Microsoft.StyleCop.CSharp.OrderingRules", "SA1118:ParameterMustNotSpanMultipleLines", Justification = "Ignoring to make code more readable")]
    public static class BookingDialogTestsDataGenerator
    {
        public static IEnumerable<object[]> BookingFlows()
        {
            yield return BuildTestCaseObject(
                "Full flow",
                new BookingDetails(),
                new string[][] { new string[] { "hi", "When would you like to travel?" }, new string[] { "Seattle", "Where are you traveling from?" }, new string[] { "New York", "When would you like to travel?" }, new string[] { "tomorrow", $"Please confirm, I have you traveling to: Seattle from: New York on: {DateTime.Now.AddDays(1):yyyy-MM-dd}. Is this correct? (1) Yes or (2) No" }, new string[] { "yes", null } },
                new BookingDetails
                {
                    Destination = "Seattle",
                    Origin = "New York",
                    TravelDate = $"{DateTime.Now.AddDays(1):yyyy-MM-dd}",
                });

            yield return BuildTestCaseObject(
                "Full flow with 'no' at confirmation",
                new BookingDetails(),
                new string[][] { new string[] { "hi", "When would you like to travel?" }, new string[] { "Seattle", "Where are you traveling from?" }, new string[] { "New York", "When would you like to travel?" }, new string[] { "tomorrow", $"Please confirm, I have you traveling to: Seattle from: New York on: {DateTime.Now.AddDays(1):yyyy-MM-dd}. Is this correct? (1) Yes or (2) No" }, new string[] { "no", null } },
                null);

            yield return BuildTestCaseObject(
                "Destination given",
                new BookingDetails
                {
                    Destination = "Bahamas",
                    Origin = null,
                    TravelDate = null,
                },
                new string[][] { new string[] { "hi", "Where are you traveling from?" }, new string[] { "New York", "When would you like to travel?" }, new string[] { "tomorrow", $"Please confirm, I have you traveling to: Bahamas from: New York on: {DateTime.Now.AddDays(1):yyyy-MM-dd}. Is this correct? (1) Yes or (2) No" }, new string[] { "yes", null }},
                new BookingDetails
                {
                    Destination = "Bahamas",
                    Origin = "New York",
                    TravelDate = $"{DateTime.Now.AddDays(1):yyyy-MM-dd}",
                });

            yield return BuildTestCaseObject(
                "Destination and Origin given",
                new BookingDetails
                {
                    Destination = "Seattle",
                    Origin = "New York",
                    TravelDate = null,
                },
                 new string[][] { new string[] { "hi", "When would you like to travel?" }, new string[] { "tomorrow", $"Please confirm, I have you traveling to: Seattle from: New York on: {DateTime.Now.AddDays(1):yyyy-MM-dd}. Is this correct? (1) Yes or (2) No" }, new string[] { "yes", null }},
                new BookingDetails
                {
                    Destination = "Seattle",
                    Origin = "New York",
                    TravelDate = $"{DateTime.Now.AddDays(1):yyyy-MM-dd}",
                });

            yield return BuildTestCaseObject(
                "All booking details given for today",
                new BookingDetails
                {
                    Destination = "Seattle",
                    Origin = "Bahamas",
                    TravelDate = $"{DateTime.Now:yyyy-MM-dd}",
                },
                new string[][] { new string[] { "hi", $"Please confirm, I have you traveling to: Seattle from: Bahamas on: {DateTime.Now:yyyy-MM-dd}. Is this correct? (1) Yes or (2) No" },  new string[] { "yes", null } },
                new BookingDetails
                {
                    Destination = "Seattle",
                    Origin = "Bahamas",
                    TravelDate = $"{DateTime.Now:yyyy-MM-dd}",
                });
        }

        public static IEnumerable<object[]> CancelFlows()
        {
            yield return BuildTestCaseObject(
                "Cancel on origin prompt",
                new BookingDetails(),
                new string[][] { new string[] { "hi", "Where would you like to travel to?" }, new string[] { "cancel", "Cancelling..." } },
                null);

            yield return BuildTestCaseObject(
                "Cancel on destination prompt",
                new BookingDetails(),
                new string[][] { new string[] { "hi", "Where would you like to travel to?" }, new string[] { "Seattle", "Where are you traveling from?" }, new string[] { "cancel", "Cancelling..." } },
                null);

            yield return BuildTestCaseObject(
                "Cancel on date prompt",
                new BookingDetails(),
                new string[][] { new string[] { "hi", "Where would you like to travel to?" }, new string[] { "Seattle", "Where are you traveling from?" }, new string[] { "New York", "When would you like to travel?" }, new string[] { "cancel", "Cancelling..." } },
                null);

            yield return BuildTestCaseObject(
                "Cancel on confirm prompt",
                new BookingDetails(),
                new string[][] { new string[] { "hi", "Where would you like to travel to?" }, new string[] { "Seattle", "Where are you traveling from?" }, new string[] { "New York", "When would you like to travel?" }, new string[] { "tomorrow", $"Please confirm, I have you traveling to: Seattle from: New York on: {DateTime.Now.AddDays(1):yyyy-MM-dd}. Is this correct? (1) Yes or (2) No" }, new string[] { "cancel", "Cancelling..." } },
                null);
        }

        /// <summary>
        /// Wraps the test case data into a <see cref="TestDataObject"/>.
        /// </summary>
        private static object[] BuildTestCaseObject(string testCaseName, BookingDetails inputBookingInfo, string[][] utterancesAndReplies, BookingDetails expectedBookingInfo)
        {
            var testData = new BookingDialogTestCase()
            {
                Name = testCaseName,
                InitialBookingDetails = inputBookingInfo,
                UtterancesAndReplies = utterancesAndReplies,
                ExpectedBookingDetails = expectedBookingInfo,
            };
            return new object[] { new TestDataObject(testData) };
        }
    }
}
