// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using Microsoft.Bot.Builder.Testing.XUnit;

namespace CoreBot.Tests.Dialogs.TestData
{
    /// <summary>
    /// A class to generate test cases for <see cref="DateResolverDialogTests"/>.
    /// </summary>
    [SuppressMessage("Microsoft.StyleCop.CSharp.OrderingRules", "SA1118:ParameterMustNotSpanMultipleLines", Justification = "Ignoring to make code more readable")]
    public static class DateResolverDialogTestsDataGenerator
    {
        public static IEnumerable<object[]> DateResolverCases()
        {
            yield return BuildTestCaseObject(
                "tomorrow",
                null,
                new string[][] { new string[] { "hi", "When would you like to travel?" }, new string[] { "the day after tomorrow", null } },
                $"{DateTime.Now.AddDays(1):yyyy-MM-dd}");

            yield return BuildTestCaseObject(
                "the day after tomorrow",
                null,
                new string[][] { new string[] { "hi", "When would you like to travel?" }, new string[] { "the day after tomorrow", null } },
                $"{DateTime.Now.AddDays(2):yyyy-MM-dd}");

            yield return BuildTestCaseObject(
                "two days from now",
                null,
                new string[][] { new string[] { "hi", "When would you like to travel?" }, new string[] { "two days from now", null } },
                $"{DateTime.Now.AddDays(2):yyyy-MM-dd}");

            yield return BuildTestCaseObject(
                "valid input given (tomorrow)",
                $"{DateTime.Now.AddDays(1):yyyy-MM-dd}",
                new string[][] { new string[] { "hi", null }, new string[] { null, null } },
                $"{DateTime.Now.AddDays(1):yyyy-MM-dd}");

            yield return BuildTestCaseObject(
                "retry prompt",
                null,
                new string[][] { new string[] { "hi", "When would you like to travel?" }, new string[] { "bananas", "I'm sorry, to make your booking please enter a full travel date including Day Month and Year." }, new string[] { "tomorrow", null } },
                $"{DateTime.Now.AddDays(1):yyyy-MM-dd}");

            yield return BuildTestCaseObject(
                "fuzzy time ",
                null,
                new string[][] { new string[] { "hi", "When would you like to travel?" }, new string[] { "may 5th", "I'm sorry, to make your booking please enter a full travel date including Day Month and Year." }, new string[] { "may 5th 2055", null } },
                "2055-05-05");
        }

        /// <summary>
        /// Wraps the test case data into a <see cref="TestDataObject"/>.
        /// </summary>
        private static object[] BuildTestCaseObject(string testCaseName, string input, string[][] utterancesAndReplies, string result)
        {
            var testData = new DateResolverDialogTestCase
            {
                Name = testCaseName,
                InitialData = input,
                ExpectedResult = result,
                UtterancesAndReplies = utterancesAndReplies,
            };
            return new object[] { new TestDataObject(testData) };
        }
    }
}
