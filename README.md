[한국임상정보 사이트](https://clinicaltrialskorea.com/)의 검색영역을 클론한 검색창

[배포링크]()

## 목차
1. [팀원 소개](#팀원-소개)
2. [실행 방법](#실행방법)
4. [협업 규칙](#협업을-위한-규칙)
5. [폴더 구조](#폴더-구조)
6. [Best practice 선정을 위한 논의점들](#best-practice-선정을-위한-논의점들)

## 팀원 소개

| 팀1 | [🐸김보현](https://github.com/BHyeonKim) | [🐶방충림](https://github.com/HWAHAEBANG) | [🐹김수진](https://github.com/notusing11) | [🐨이지은](https://github.com/jieeeun2) |
| --- | --- | --- | --- | --- |
| 개인과제 | [김보현의 개인과제](https://github.com/BHyeonKim/wanted-pre-onboarding-12-3-bohyeon-) | [방춤림의 개인과제](https://github.com/HWAHAEBANG/pre-onboarding-12th-3) | [김수진의 개인과제](https://github.com/notusing11/cache-storage) | [이지은의 개인과제](https://github.com/jieeeun2/pre-onboarding-12th-3-1) |

```
npm install && npm run dev
```

---

## **기술 스택 및 사용한 라이브러리**

- Language
  - Typescript
  - sass
- Library
  - React
  - axios
  - react-redux
  - redux-toolkit
  - redux-saga
  - html-react-parser
- Linting & Formatting
  - Prettier
  - Eslint ***with tons of plugins and configs***
- Automation
  - Husky
  - Commitlint
  - Lint Staged

---

## 폴더 구조

```
    📦src
    ├─📂assets               # 리소스 폴더
    │  ├─fonts
    │  └─svgs
    ├─📂components           # 컴포넌트 폴더
    │  ├─List
    │  ├─SearchBar
    │  ├─SearchButton
    │  ├─SearchInput
    │  └─SearchRecommendation
    ├─📂hooks                # 커스텀 훅 폴더
    ├─📂pages                # 페이지 폴더
    │  └─MainPage
    ├─📂redux                # redux 폴더
    ├─📂services             # api호출 함수를 모아둔 폴더
    ├─📂styles               # 스타일 폴더
    ├─📂types                # 타입 폴더
    └─📂utils                # 훅을 제외한 일반 유틸함수 폴더
```

---
<br/>
<br/>


## Best Practice 선정을 위한 논의점들
  
### 📌 API 요청 최소화

추천 검색어 API의 요청을 최소화하기 위해서는 `불필요한 요청이 발생할 수 있는 경우의 수`를 파악하는 것이 우선이라 판단했습니다.

파악한 경우의 수는 다음과 같습니다.

#### ✅ 경우 1. 입력된 문자 중 마지막 문자가 완성형 글자가 아닌 경우. ex) `담ㄷ`

- 구글과 같은 검색엔진의 경우 초성만 입력하여도 추천 검색어를 제공하지만, 과제에서 주어진 API의 경우에는 **완전한 글자에만 추천 검색어를 제공**하고 있습니다. 
- 이러한 API의 특성을 고려하였을 때, `담ㄷ` 와 같이 마지막 글자가 `단모음·단자음`으로 끝나는 경우 API요청 보내지 않는 방법이 글자 수 만큼의 API요청 횟수를 줄여 줄 수 있을 것이라 판단했습니다.
- 또한 입력 도중에 `검색어 없음` 이 뜨는 것을 방지하여 조금 더 우수한 사용자 경험을 제공할 수 있을 것이라 생각했습니다.
- 이를 구현하기 위해 정규식을 사용하여, 문자열의 마지막이 `단모음·단자음`일 때를 구분해주는 `Validator`를 사용하는 방안을 고안했습니다.
```typescript
// utils > validator.ts

const isolatedKoreanCharacterRegex = /[ㄱ-ㅎㅏ-ㅣ]$/;

export const isolatedKoreanCharacterValidator = (searchKeyword: string) => {
  return isolatedKoreanCharacterRegex.test(searchKeyword);
};
```
![Alt text](image-2.png)
#### ✅ 경우 2. 입력된 문자가 없는 경우 (모두 지웠을 경우)
- 모든 입력이 지워진 상태에서도 API요청이 발생합니다. 이 부분을 예외처리 하면 불필요한 요청을 줄이는 효과와 더불어, 빈 문자열을 파라미터로 전송 시 모든 데이터들을 반환해 주는 문제를 보완해 줄 수 있습니다.

#### ✅ 경우 3. 더 입력을 진행해도 더이상 추천할 목록이 없을 것으로 판단되는 경우.
- 이 경우를 예외처리 할 경우 굉장히 많은 API요청을 줄여줄 것이라 판단했습니다. 하지만 한글의 입력방식의 특수성으로 인해 구현하는데에 많은 제한사항이 있었습니다.
<br/><br/>
- 🧪 `시도한 방법 1` :  입력을 하다가 API의 결과가 없어지면, 이후 요청을 하지 않기.
   - 실패 이유
      - 한글의 특성상 받침의 유무에 따라 예상할 수 있는 단어가 달라집니다.
      - 예를들어 `갑상선`을 입력하는 과정에 `갑사` 에서는 추천 검색어가 없다가. `갑상` 에서 다시 생기므로 이 방법 부적합하다고 판단하였습니다.
      <br/>
      <br/>
- 🧪 `시도한 방법 2` :  키보드가 `5번` 눌렸음에도 계속 결과가 없다면, 이후로는 더이상 추천 검색어는 없을 것으로 판단하고 이후 요청을 하지 않기.
   - 왜 하필 5번인 인가?
      - 한글로 만들어낼 수 있는 문자 중 가장 많은 키보드 입력을 요하는 경우는 `괅` 같은 형태이고 5번의 키입력을 요구하기 때문입니다.
   - 구체적인 방안 
      - useRef 훅을 사용하여, 결과가 없을 때마다 Ref값을 1씩 증가 시킵니다.
      - 입력 도중 결과가 나오면 0으로 초기화합니다.
      - Ref가 5 보다 커지면 이후 API요청은 진행하지 않습니다.
      - 다시 삭제하는 경우 재요청이 가능하도록 Backspace를 누르면 다시 1씩 감소시킵니다.
   - 실패 이유
      - 한글의 특성상 키보드 눌리는 횟수가 `입력 시`와 `지울 시` 가 다르기 때문에 ref를 다시 1씩 감소 시킬 시 버그가 발생합니다.
      - 예를 들어, `강남` 을 입력한다고 가정하면 입력 시에는 `ㄱ` → `가` →`강` →`강ㄴ` →`강나` →`강남` 순으로 6회에 걸쳐 생성되는 반면, 삭제 시에는 `강나` →`강ㄴ` →`강` →`‘’` 순을 4회에 걸쳐 삭제되기 때문에, 일관성 있는 Count값을 유지할 수 없습니다.
      <br/><br/>
- 결론 : 결과값이 없을 경우를 미리 판단하는 것에는 한글의 경우 제약이 있으므로, `디바운싱`을 통해서 횟수를 줄이는 것이 최선일 것으로 판단하였습니다.

#### ✅ 경우 4. 값이 계속 입력되는 경우 `ex)ㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱ...`
- 사용자가 검색창을 이용하다 의도치 않게 키보드가 눌려 값이 계속 입력되는 경우가 발생할 수 있습니다.
- 이로 인해 API요청이 계속해서 발생할 경우 프로그램의 성능에 큰 무리를 불러올 수 있습니다.
- 이 경우 `리바운싱`기술을 통해서 문제를 해결할 수 있습니다. 
- 리바운싱은 일정시간동안 작업을 하지 않으면 동작이 시작되는 방식으로 작동합니다. 즉 사용자가 입력을 끝난 것으로 판단하고 API요청을 진행합니다.
- 따라서 `ㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱ...`와 같이 키보드가 눌려도 마지막 한 번만 API요청이 발생하게 됩니다.


| No. | 논의된 방안 | 채택 |
| --- | --- | --- |
| 1 | 마지막 문자가 완성형 글자가 아닌 경우 API요청 안하기|  |
| 2 | 입력된 문자가 없는 경우 API요청 안하기 | 👑 |
| 3 | 더 입력을 진행해도 더이상 추천할 목록이 없을 것으로 판단되는 경우 API요청 안하기 |  |
| 4 | 쓰로틀링  |   |
| 5 | 디바운싱  | 👑 |

#### 선정 근거
- 3번 방안을 적용함에 있어 한글의 특수성 제약으로 인해 이에 대한 대안으로 디바운싱 방식을 채택하였습니다. 
- 이 과정에서 디바운싱이 1번 방안의 역할까지 해결해줄 것이라 판단하였습니다.
- 쓰로틀링 기술에 대한 의견도 있었으나, `일정 시간마다 요청을 보내는 쓰로틀링` 기술 보다는 `일정시간동안 작업을 하지 않으면 요청을 보내는 방식인 디바운싱`이 더 적합할 것으로 생각하였습니다.
- 아쉽게도, 디바운싱은 특성상 필연적으로 이벤트와 이에 대한 응답 사이의 불가피한 지연을 야기합니다. 따라서 `반응속도`와 `API 호출 횟수 감소` 중에서 어떠한 것을 중시하는지에 따라 선택이 달라질 수 있겠으며, 해당 과제의 경우에는 `API요청 횟수 감소 방안`에 대해 요구사항을 명시하고 있기 때문에 `디바운스`방식을 선택하였습니다.
                        

<br/>
<br/>

### 📌 로컬 캐싱

| No. | 논의된 방안 | 채택 |
| --- | --- | --- |
| 1 | 전역 상태 관리 툴 또는 Context API |  |
| 2 | 내부 State에 저장하여 props drilling |  |
| 3 | 브라우저 Cache Storage에 저장 | 👑 |

#### 선정 근거
- 전역 상태 관리 툴이나 내부 State에 저장하면 LocalStorage등에 저장하지 않는한 새로고침을하면 캐시 데이터가 날라감.
- 브라우저의 Cache Storage는 많은 모던 브라우저에서 지원하여 호환성이 뛰어나고 새로고침을 해도 캐시가 날라가지 않음
- 캐시 데이터의 Expire는 데이터를 Cache Storage에 저장할 때 헤더에 Expire-Date를 같이 넣어주고 캐시를 꺼낼 때 현재 시간과     Expire-Date를 비교하여 데이터가 유효한지 판단.

#### 구현 방법
Cache를 저장하고 읽는 함수(setCache와 getCache)를 작성하였습니다.

> setCache 함수 

- expireTIme을 인자로 받아 현재시간에 더하여 헤더에 EXPIRE-DATE의 value로 넣어줍니다.

```typescript
export const setCache = async (
  request: RequestInfo | URL,
  axiosResponse: AxiosResponse,
  expireTime = EXPIRE_TIME,
) => {
  const expireDate = new Date().getTime() + expireTime // 현재시간을 기준으로 만료시간을 계산합니다
  const response = new Response(JSON.stringify(axiosResponse.data), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'EXPIRE-DATE': `${expireDate}`, // 해더에 만료시간을 추가합니다
    },
  })

  const cache = await caches.open(CACHE_NAME)
  await cache.put(request, response)  // Cache storage에 삽입합니다
}
```

> getCache 함수 

- 캐시값이 없으면 : 캐시된 데이터를 검색하여 검색값이 없으면 undefind를 리턴합니다.<br/>
- 캐시 값이 있으면:  
  - EXPIRE-DATE가 더 크면(데이터가 유효하지 않으면): 캐시값이 있으면 캐시값의 헤더에 들어있는 EXPIRE-DATE와 현재 시간을 비교하고 현재 시간이 더 크면 undefinde를 리턴합니다. 
  - EXPIRE-DATE가 작으면(아직 데이터가 유효하면): 캐시된 데이터를 리턴합니다.


```typescript
export const getCache = async (request: RequestInfo | URL) => {
  const nowTime = new Date().getTime()
  const cache = await caches.open(CACHE_NAME)
  const response = await cache.match(request) // request와 동일한 캐시가 있는지 검색합니다

  if (!response) return // 저장된 캐시가 없으면 undefined를 리턴합니다

  const dueTime = Number(response.headers.get('EXPIRE-DATE')) // 캐시의 헤더에 저장된 만료시간을 가져옵니다

  if (dueTime - nowTime < 0) {      // 현재시간이 만료시간보다 크면
    await cache.delete(request)     // 캐시를 삭제하고
    console.info('cache deleted')
    return                          // undefined를 리턴합니다.
  }

  return await response.json()     // 캐시가 있으면 캐시된 데이터를 리턴합니다
}
```

위의 함수들을 사가에서 호출합니다

```typescript
function* fetchData(action: ReturnType<typeof changeInput>) {
  ...
  try {
    const cachedData: SickResponseData | undefined = yield getCache( // 캐시데이터를 요청합니다
      `/sick?q=${action.payload}`,
    )
    if (!cachedData) {  // 캐시데이터가 없으면 새로운 API 요청을 합니다
      const response: AxiosResponse<SickResponseData> = yield sick.getSick(action.payload)
      console.info('calling api')
      if (response.config.url) { // response의 config에 있는 url을 사용하여 캐시에 저장합니다
        setCache(response.config.url, response)
      }
      yield put(setSick(response.data)) // response data를 리덕스에 저장합니다
    } else {
      yield put(setSick(cachedData))  // 캐시된 데이터를 리덕스에 저장합니다.
    }
  } catch (e) {
    console.error(e)
  }
}
```


<br/>
<br/>


### 📌 키보드 수직 탐색 

| No. | 논의된 방안 | 채택 |
| --- | --- | --- |
| 1 | 검색 결과로 추천 키워드만 보여줌 vs 입력한 키워드도 함께 보여줌  |  |
| 2 | 엔터키로 검색 가능하도록 포커싱 된 내용이 Input태그의 value에 즉시 반영 | 👑 |
| 3 | input의 onKeyDown이벤트에 ArrowUp, ArrowDown가 일어나면 각각 ↑방향 ↓방향으로 수직 탐색 가능하게 함 | 👑 |
| 4 | 맨 아래에서 ↓키 누르면 초기 인덱스값을 다시 부여하는 방식으로 맨 위로 이동 | 👑 |
| 5 | 포커스 이동시 스크롤도 따라오도록 useRef사용 | 👑 |

#### 선정 근거
- 키보드 수직 탐색 관련한 부분은 오로지 사용자 편의성을 위한 것이기 때문에 검색포털에서 많이 사용하는 방식을 채택하는 것이 좋다고 판단하였습니다.
- 추천 키워드와 입력한 키워드를 함께 화면에 표출하는 경우, 사용자 입장에서는 어떤게 전송되어 검색되는지 알아보기 쉽지 않음. 그래서 키워드를 입력한 직후에는 Input에 입력한 키워드가 보이지만 키보드로 수직 탐색을 하면 Input에 포커싱된 추천 키워드가 들어가도록하였습니다.
- 포커싱된 추천 키워드는 탐색이 이루어질 때마다 계속해서 업데이트 되어야 하고,
추천 검색어 목록에 대한 SearchRecommendation컴포넌트와 입력한 키워드 관련한 SearchInput컴포넌트 
두 컴포넌트 모두에서 포커싱된 키워드 상태값이 필요하기 때문에 전역으로 관리하였습니다.

<br/>
<br/>

### 📌 빈문자열일 때 모든 병 목록을 가져오는 것

| No. | 논의된 방안 | 채택 |
| --- | --- | --- |
| 1 | saga안에서 changeInput 액션이 디스패치 됐을때 payload에 담긴 문자열의 길이가 0이면 추천리스트를 변경하는 setList액션에 빈 문자열을 넣고 디스패치한 후에 리턴합니다. |  |

#### 선정 근거
- 1번 방법 사용 시 한 번 받아온 데이터를 재사용하기 때문에 디테일 페이지 접근 속도에       
  있어서는 우수하나, 디테일 페이지의 데이터가 오래된 데이터일 가능성이 비교적 높은 점을 고려하였습니다.
- 1번 방법도 결국 새로고침 시 서버로 부터 데이터를 받아와야하므로 2번 방법이 불가피하다고 판단하였습니다.

<br/>
<br/>

### 📌 한글 입력시 이벤트 두번 발생 (IME 문제)

| No. | 논의된 방안 | 채택 |
| --- | --- | --- |
| 1 | 한글은 자음 + 모음의 조합으로 하나의 글자가 완성되기 때문에 영어와 달리 |  |
| 2 | useParam으로 id값 취득 후 해당 값으로 데이터를 새로 요청 | 👑 |

#### 선정 근거
- 1번 방법 사용 시 한 번 받아온 데이터를 재사용하기 때문에 디테일 페이지 접근 속도에       
  있어서는 우수하나, 디테일 페이지의 데이터가 오래된 데이터일 가능성이 비교적 높은 점을 고려하였습니다.
- 1번 방법도 결국 새로고침 시 서버로 부터 데이터를 받아와야하므로 2번 방법이 불가피하다고 판단하였습니다.

