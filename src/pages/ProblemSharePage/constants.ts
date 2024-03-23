export const MOCK_MEMBER_LIST = [
  {
    memberId: 20,
    email: 'soopy368@gmail.com',
    nickname: '수박이박수',
    profileImage: null,
    role: 'HOST',
    joinTime: '2024-03-04T00:45:18',
    ready: false,
  },
  {
    memberId: 1,
    email: 'test1@test.com',
    nickname: 'test1',
    profileImage: null,
    role: 'PARTICIPANT',
    joinTime: '2024-03-04T00:45:36',
    ready: false,
  },
  {
    memberId: 2,
    email: 'test@test.com',
    nickname: 'test2',
    profileImage: null,
    role: 'PARTICIPANT',
    joinTime: '2024-03-04T00:45:36',
    ready: false,
  },
];

export const MOCK_MY_ID = 20;
export const MOCK_SOLVE_RESULT = [
  {
    memberId: 20,
    language: 'java',
    code: '// 수박이박수\nimport java.io.BufferedReader;\nimport java.io.IOException;\nimport java.io.InputStreamReader;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String[] input = br.readLine().split(" ");\n        int a = Integer.parseInt(input[0]);\n        int b = Integer.parseInt(input[1]);\n        System.out.println(a + b);\n    }\n}',
    solveStatus: 'SUCCESS',
  },
  {
    memberId: 1,
    language: 'c++',
    code: '// test1\n#include <stdio.h>\nint main() {\n\tint a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d", a+b);\n\n}',
    solveStatus: 'FAIL',
  },
  {
    memberId: 2,
    language: 'nodejs',
    code: '',
    solveStatus: 'FAIL',
  },
];
