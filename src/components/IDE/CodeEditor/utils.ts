export const LANGUAGES = {
  JAVASCRIPT: 'JAVASCRIPT',
  JAVA: 'JAVA',
  PYTHON: 'PYTHON',
  'C++': 'C++',
} as const;

export type LanguagesType = keyof typeof LANGUAGES;

export const getEditorMode = (language: string) => {
  switch (language) {
    case 'c++':
      return 'text/x-c++src';
    case 'java':
      return 'text/x-java';
    case 'python':
      return 'text/x-python';
    case 'javascript':
      return 'text/javascript';
    default:
      return 'text/javascript';
  }
};

export const getRandomColors = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
};

interface CodeEditorDefaultValue {
  [key: string]: string;
}

export const codeEditorDefaultValue: CodeEditorDefaultValue = {
  cpp: `// 백준 1000번 예제 소스 코드
#include <iostream>
using namespace std;
int main() {
	int a, b;
	cin >> a >> b;
	cout << a+b << endl;
	return 0;
}`,
  java: `import java.util.*;
public class Main{
  public static void main(String args[]){
    Scanner sc = new Scanner(System.in);
    int a, b;
    a = sc.nextInt();
    b = sc.nextInt();
    System.out.println(a + b);
  }
}`,
  python3: `# 백준 1000번 예제 소스 코드
a, b = map(int, input().split())
print(a+b)`,
  nodejs: `// 한 줄 입력
// 백준 1000번 예제 소스 코드
let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
let a = parseInt(input[0]);
let b = parseInt(input[1]);
console.log(a + b);

// 여러 줄 입력
let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');`,
};
