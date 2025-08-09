import axios from "axios";
import { atomWithRefresh } from "jotai/utils";

export let api = "https://68223a6fb342dce8004d921a.mockapi.io/ishoq";

export const AtomData = atomWithRefresh(async () => {
  try {
    const { data } = await axios.get(api);
    return data;
  } catch (error) {
    console.log(error);
  }
});