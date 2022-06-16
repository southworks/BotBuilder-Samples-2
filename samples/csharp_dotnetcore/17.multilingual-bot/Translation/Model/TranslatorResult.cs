// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using Newtonsoft.Json;

namespace Microsoft.BotBuilderSamples.Translation.Model
{
    /// <summary>
    /// Translation result from Translator API v3.
    /// </summary>
#pragma warning disable CA1812 //This class is used as type parameter in MicrosoftTranslator.
    internal class TranslatorResult
#pragma warning restore CA1812
    {
        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("to")]
        public string To { get; set; }
    }
}
