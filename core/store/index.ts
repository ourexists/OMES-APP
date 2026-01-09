import {Dict, dict} from "./dict";
import {User, user} from "./user";
import {WorkshopTree, workshopTree} from "./workshopTree";

type Store = {
    user: User;
    dict: Dict;
    workshopTree: WorkshopTree;
};

export function useStore(): Store {
    return {
        user,
        dict,
        workshopTree
    };
}

export * from "./dict";
export * from "./user";
export * from "./workshopTree";