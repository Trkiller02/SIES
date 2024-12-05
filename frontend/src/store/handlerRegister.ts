import { create } from "zustand";

export interface dataRelationsI {
  represent_id:
    | string
    | {
        id: string;
      };
  ficha_id: string;
  mother_id: string;
  father_id: string;
  health_info_id: string;
  student_id: string;
}

interface ContextType {
  dataRelations: dataRelationsI;
  setDataRelations: (data: Partial<dataRelationsI>) => void;
  setLocalProcess: () => Promise<void>;
  getLocalProcess: () => Promise<void>;
}

export const registerContext = create<ContextType>((set, get) => ({
  dataRelations: {
    ficha_id: "",
    health_info_id: "",
    student_id: "",
    mother_id: "",
    father_id: "",
    represent_id: "",
  },
  setDataRelations: (data: Partial<dataRelationsI>) =>
    set(
      (state) => ({
        dataRelations: { ...state.dataRelations, data },
      }),
      false
    ),
  setLocalProcess: async () => {
    if (typeof window !== "undefined") {
      await window.localStorage.setItem(
        "dataRelations",
        JSON.stringify(get().dataRelations)
      );
    }
  },
  getLocalProcess: async () => {
    if (typeof window !== "undefined") {
      const data = await window.localStorage.getItem("dataRelations");

      if (data !== null) {
        const infoParsed = await JSON.parse(data);
        set((state) => ({ dataRelations: infoParsed }), false);
      }
    }
  },
}));
