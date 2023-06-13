type itemDTO = {
  name: string;
  code: string;
  head: number;
  status: boolean;
  id: number;
};

export const defaultItemInput: itemDTO = {
  name: '',
  code: '',
  head: 0,
  status: false,
  id: 0,
};

export default itemDTO;
