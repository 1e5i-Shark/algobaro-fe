interface ProblemData {
  title?: string | null;
  text?: string | null;
  code?: string | null;
  domString?: string | null;
}

const parseProblemInfo = (problemInfoHtml: string | undefined) => {
  if (!problemInfoHtml) return;
  // HTML 파싱
  const parser = new DOMParser();
  const $problemInfo = parser.parseFromString(problemInfoHtml, 'text/html');
  // 문제 정보 body 부분을 추출한다.
  const $problemBody = $problemInfo.querySelector('#problem-body');
  // 각 세부 정보를 추출한다.
  const $description = $problemBody?.querySelector('#description h2');
  const $problemDescription = $problemBody?.querySelector(
    '#problem_description'
  );
  const $input = $problemBody?.querySelector('#input h2');
  const $problemInput = $problemBody?.querySelector('#problem_input p');
  const $output = $problemBody?.querySelector('#output h2');
  const $problemOutput = $problemBody?.querySelector('#problem_output p');
  const $limit = $problemBody?.querySelector('#limit h2');
  const $problemLimit = $problemBody?.querySelector('#problem_limit ul');

  const $sampleInputs = $problemBody?.querySelectorAll(
    'section[id^=sampleinput]'
  );
  const $sampleOuputs = $problemBody?.querySelectorAll(
    'section[id^=sampleoutput]'
  );

  const sampleInputs = Array.prototype.slice.call($sampleInputs);
  const sampleOuputs = Array.prototype.slice.call($sampleOuputs);

  // 문제, 입력, 출력, 제한조건을 객체 배열 형태로 변환한다.
  const problemInfoList: ProblemData[] = [
    {
      title: $description?.textContent,
      domString: $problemDescription?.innerHTML.trim(),
    },
    {
      title: $input?.textContent,
      text: $problemInput?.textContent,
    },
    {
      title: $output?.textContent,
      text: $problemOutput?.textContent,
    },
    {
      title: $limit?.textContent,
      domString: $problemLimit?.outerHTML.trim(),
    },
  ];

  // 예제 입출력
  Array.from({ length: sampleInputs.length }, (_, i) => i).forEach(index => {
    const sampleInput = sampleInputs[index];
    const sampleOutput = sampleOuputs[index];

    const sampleInputHeadline = sampleInput
      .querySelector('h2')
      ?.innerText.replace('복사', '');
    const sampleInputData = sampleInput.querySelector('pre')?.textContent;

    const sampleOutputHeadline = sampleOutput
      .querySelector('h2')
      ?.innerText.replace('복사', '');
    const sampleOutputData = sampleOutput.querySelector('pre')?.textContent;

    problemInfoList.push({
      title: sampleInputHeadline,
      code: sampleInputData,
    });

    problemInfoList.push({
      title: sampleOutputHeadline,
      code: sampleOutputData,
    });
  });

  return problemInfoList;
};

export default parseProblemInfo;
