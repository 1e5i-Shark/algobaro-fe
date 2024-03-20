export const MOCK_DATA = {
  COMPILE: {
    language: 'java',
    input: '1 2',
    code: 'import java.io.BufferedReader;\nimport java.io.IOException;\nimport java.io.InputStreamReader;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String[] input = br.readLine().split(" ");\n        int a = Integer.parseInt(input[0]);\n        int b = Integer.parseInt(input[1]);\n        System.out.println(a + b);\n    }\n}',
  },
  SUBMISSION: {
    roomUuid: '123e4567-e89b-12d3-a456-426614174000',
    language: 'java',
    code: 'import java.io.BufferedReader;\nimport java.io.IOException;\nimport java.io.InputStreamReader;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String[] input = br.readLine().split(" ");\n        int a = Integer.parseInt(input[0]);\n        int b = Integer.parseInt(input[1]);\n        System.out.println(a + b);\n    }\n}',
    problemLink: 'https://www.acmicpc.net/problem/1000',
  },
} as const;

export const DIRECTION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const;

export const SIZE_PERCENTAGE = {
  PROBLEM: 40,
  SOLVE: 60,
  EDITOR: 70,
  EXECUTION: 30,
} as const;

export const STATUS_DATA_SET: Record<string, string> = {
  SUCCESS: '맞았습니다',
  FAIL: '틀렸습니다',
  TIME_LIMIT: '시간 초과',
  MEMORY_LIMIT: '메모리 초과',
  ETC: '기타 에러',
};
