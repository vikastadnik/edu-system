export const getSelectedGroup = (state) => state.groups?.list?.find((g) => g.uuid === state.groups?.selectedUuid);
