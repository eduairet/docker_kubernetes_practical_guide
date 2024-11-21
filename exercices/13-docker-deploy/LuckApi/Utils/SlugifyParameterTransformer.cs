using System.Text.RegularExpressions;

namespace LuckApi.Utils;

public partial class SlugifyParameterTransformer : IOutboundParameterTransformer
{
    public string? TransformOutbound(object? value)
    {
        if (value == null) { return null; }
        string? str = value.ToString();
        if (string.IsNullOrEmpty(str)) { return null; }
        return MyRegex().Replace(str, "$1-$2").ToLower();
    }

    [GeneratedRegex("([a-z])([A-Z])")]
    private static partial Regex MyRegex();
}