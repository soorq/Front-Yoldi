type TypeStoreAction = {
    signout: () => void;
    signin: () => void;
    signup: () => void;
    update: () => void;
};

type TypeStoreState = {
    user: null;
};

export type TypeStore = TypeStoreAction & TypeStoreState;
