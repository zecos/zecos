import overview from "./pages/overview.md"
import createInputPage from "./pages/input/create-input.md"
import createLayoutPage from "./pages/input/create-layout.md"
import createMultiPage from "./pages/input/create-multi.md"
import fieldPage from './pages/general/field.md'
import inputMuiPage from './pages/ui-libraries/input-mui.md'
import inputBasicPage from './pages/ui-libraries/input-basic.md'
import inputPickerPage from './pages/ui-libraries/input-picker.md'
import inputOverviewPage from './pages/input/overview.md'
import uiOverviewPage from './pages/ui-libraries/overview.md'
import uiGeneralPage from './pages/ui-libraries/general.md'
import validatePage from './pages/general/validate.md'

export const routes = [{
    name: "",
    children: [{
      title: "Overview",
      link: "/",
      cmpt: overview,
    }]
  }, {
    name: "UI Libraries",
    children: [{
      title: "Overview",
      link: "/ui-libraries/overview",
      cmpt: uiOverviewPage,
    }, {
      title: "General",
      code: false,
      link: "/ui-libraries/general",
      cmpt: uiGeneralPage,
    }, {
      title: "@zecos/input-basic",
      link: "/ui-libraries/input-basic",
      cmpt: inputBasicPage,
    }, {
      title: "@zecos/input-mui",
      link: "/ui-libraries/input-mui",
      cmpt: inputMuiPage,
    }, {
      title: "@zecos/input-picker",
      link: "/ui-libraries/input-picker",
      cmpt: inputPickerPage,
    }]
  }, {
    name: "@zecos/input",
    children: [{
      title: "Overview",
      code: false,
      link: "/input/overview",
      cmpt: inputOverviewPage,
    }, {
      title: "createInput",
      code: false,
      link: "/input/create-input",
      cmpt: createInputPage,
    }, {
      title: "createLayout",
      link: "/input/create-layout",
      cmpt: createLayoutPage,
      code: false,
    }, {
      title: "createMulti",
      link: "/input/create-multi",
      cmpt: createMultiPage,
      code: false,
    }],
  }, {
  name: "General",
  children: [{
    title: "@zecos/field",
    link: "/field",
    cmpt: fieldPage,
  }, {
    title: "@zecos/validate",
    link: "/validate",
    cmpt: validatePage,
  }]
}]


export const getRouteLinks = () => {
  const result: string[] = []
  routes.forEach(route => {
    route.children.forEach(child => {
      result.push(child.link)
    })
  })
  return result
}