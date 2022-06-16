// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System.Collections.Generic;
using Newtonsoft.Json;

namespace Microsoft.BotBuilderSamples.Translation.Model
{
    /// <summary>
    /// Array of translated results from Translator API v3.
    /// </summary>
#pragma warning disable CA1812 //This class is used as type parameter in MicrosoftTranslator.
    internal class TranslatorResponse
#pragma warning restore CA1812
    {
        [JsonProperty("translations")]
        public IEnumerable<TranslatorResult> Translations { get; set; }
    }
}
