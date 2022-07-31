# 모각코 사이드 프로젝트 FE

## prerequisite

### `yarn install`

You can install libraries as written in `package.json` file.
(no more `/node_modules` folder. [pnp file](https://toss.tech/article/node-modules-and-yarn-berry))

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Libraries

### react & react-dom 등

CRA (Create React App) 사용

### typeScript

JS에서 동적 언어 특징으로 발생하는 이슈 해결

### react-router-dom

화면 전환 라이브러리

### react-query

비동기 로직을 쉽게 다루게 도와줌
서버 상태를 가져오며 동시에 캐싱 처리, 동기화 처리, 업데이트 처리를 할 수 있도록 도와주는 라이브러리 (서버 상태 라이브러리)

### styled-components

CSS in JS

### zustand

클라이언트 상태 라이브러리

### react-beautiful-dnd

Drag & Drop

### ~~react-hook-form~~

form 을 쉽게 만들어 줌

### ~~framer-motion~~

애니메이션을 예쁘게 도와줌

### eslint

코드 퀄리티를 일관되게 관리하기 위함

### prettier

코드의 스타일을 유지 시키기 위함 (+ format on save)

### eslint-config-prettier

eslint에서 prettier와 중복되는 formatting rule 제거

### ~~Husky~~

git에 어떤 명령이 실행될 때 같이 실행하게 할 수 있는 명령을 관리하는 도구 (e.g. pre-commit)

## Extensions (in VS Code)

### Eslint

### Prettier

---

### 참고 사이트

[yarn 적용 (★)](https://kasterra.github.io/setting-yarn-berry/)
