export type StudentType = {
  id: number,
  name: string,
  grade: number,
  department: string,
};

export type StudentLogType = {
  student: StudentType,
  time: number,
  isSync: boolean,
  sync: {
    time: number,
  },
  metadata: {
    status: string,
  }
};
