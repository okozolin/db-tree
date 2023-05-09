import {
    TbCloudDataConnection,
    TbDatabase,
    TbSchema,
    TbTable,
    TbColumns3,
    TbFileUnknown
} from "react-icons/tb";
import {
    COLUMN,
    CONNECTION,
    DATABASE, OTHER,
    SCHEMA,
    TABLE
} from "../constants/general";
import {platformColors} from "../constants/colors";
import {IconMapProps} from "../types";

export const iconsMap:IconMapProps = {
    [CONNECTION] : {
        type: CONNECTION,
        icon: TbCloudDataConnection,
        color: platformColors.lila
    },
    [DATABASE]: {
        type: DATABASE,
        icon: TbDatabase,
        color: platformColors.orange
    },
    [SCHEMA]: {
        type: SCHEMA,
        icon: TbSchema,
        color: platformColors.mint
    },
    [TABLE]: {
        type: TABLE,
        icon: TbTable,
        color: platformColors.bluish
    },
    [COLUMN]: {
        type: COLUMN,
        icon: TbColumns3,
        color: platformColors.lightPink
    },
    [OTHER]: {
        type: OTHER,
        icon: TbFileUnknown,
        color: platformColors.darkGrey
    },
}