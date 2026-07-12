/**
 * Google Sheets 신청 데이터 수집용 Apps Script
 *
 * [설치 방법]
 * 1. 새 Google Sheets 문서를 만든다 (또는 기존 문서 사용).
 * 2. 상단 메뉴 "확장 프로그램 > Apps Script" 클릭.
 * 3. 열린 편집기의 기본 코드(Code.gs)를 전부 지우고 이 파일 내용을 붙여넣는다.
 * 4. 저장 후, 우측 상단 "배포 > 새 배포" 클릭.
 * 5. 유형 선택(⚙️)에서 "웹 앱" 선택.
 *    - 실행 계정: 나
 *    - 액세스 권한: 전체 사용자(Anyone)
 * 6. "배포" 클릭 → 권한 승인 → 생성된 "웹 앱 URL"을 복사한다.
 * 7. 복사한 URL을 script.js 상단의 SUBMIT_ENDPOINT 값에 붙여넣는다.
 *
 * 이후 폼이 제출될 때마다 이 시트의 활성 시트에 한 줄씩 데이터가 쌓인다.
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // 첫 실행 시 헤더가 없으면 추가
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "제출시각", "이름", "연락처", "이메일", "업종/사업분야",
      "AI활용수준", "궁금한점", "개인정보동의"
    ]);
  }

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.phone || "",
    data.email || "",
    data.business || "",
    data["ai-level"] || "",
    data.question || "",
    data.privacy ? "동의" : "미동의"
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
