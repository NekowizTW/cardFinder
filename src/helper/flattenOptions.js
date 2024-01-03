const serializeValue = (value) => (value instanceof RegExp ? {
  source: value.source, flags: value.flags,
} : value);

export default function flattenOptions(twoLayerOptions) {
  return twoLayerOptions.reduce((acc, topLayerOption) => {
    if (!topLayerOption.options) {
      return [...acc, {
        ...topLayerOption,
        value: serializeValue(topLayerOption.value),
      }];
    }

    return [
      ...acc,
      ...topLayerOption.options.map((subLayerOption) => ({
        ...subLayerOption,
        value: serializeValue(subLayerOption.value),
        groupLabel: topLayerOption.label,
      })),
    ];
  }, []);
}
