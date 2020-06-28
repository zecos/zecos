/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, createContext, useContext } from 'react'
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme, createStyles, ThemeProvider } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ReactMarkdown from 'react-markdown'
import './App.css'
import {
  Route,
  Switch,
  Link,
  useLocation,
} from "react-router-dom"
import clsx from 'clsx'
import { CodeBlock } from './CodeBlock/CodeBlock';
import { routes } from './routes';


;(() => {
  // show the route links for the react-snapshot
  // should probably move md files to public.
  const routeLinks = routes.reduce((acc, cur) => {
    cur.children.forEach(route => {
      acc.push(route.link)
    })
    return acc
  }, ([] as string[]))
  console.log(JSON.stringify(routeLinks, null, 2))
})()


const memoize = fn => {
  const cache = {}
  return (...args) => {
    const key = JSON.stringify(args)
    if (cache[key]) {
      return cache[key]
    }
    return cache[key] = fn(...args)
  }
}
 const getMDText = memoize((file) => {
  return fetch(file).then(res => res.text()) 
})

const getBodyHeight = () => {
  const body = document.body
  const html = document.documentElement
  
  return Math.max( body.scrollHeight, body.offsetHeight, 
    html.clientHeight, html.scrollHeight, html.offsetHeight )
}

declare var history: any;
declare var location: any;

const scrollToId = (id) => {
  const el = document.querySelector(id)
  if (el) {
    if (history.pushState) {
      history.pushState(null, null, id);
    }
    else {
      location.hash = id;
    }
    window.scrollTo(0, el.getBoundingClientRect().top - 80)
  }
}

function flatten(text, child) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
}

const getMd = (file: string) => () => {
  const [cmpt, setCmpt] = useState(<div>Loading...</div>)
  useEffect(() => {
    (async () => {
      try {
        const text = await getMDText(file)
        setCmpt(<ReactMarkdown
          source={text}
          renderers={{
            code: CodeBlock,
            link: el => {
              const {href} = el
              const label = el.children[0].props.value
              if (href.startsWith('/')) {
                return <Link to={href}>{label}</Link>
              } else if (href.startsWith('#')) {
                return <a
                  href={href}
                  onClick={e => {
                    e.preventDefault()
                    scrollToId(href)
                  }}
                >
                  {label}
                </a>
              }
              return <a href={href}>{label}</a>
            },
            heading: (props) => {
              const children = React.Children.toArray(props.children)
              const text = children.reduce(flatten, '')
              const slug = text.toLowerCase().replace(/\W/g, '-')
              return React.createElement('h' + props.level, {id: slug}, props.children)
            }
          }}
        />)
      } catch {
        console.log("couldn't fetch file " + file)
      }
    })()
  }, [file])
  return cmpt
}

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    white: {
      color: "#D8DEE9",
    },
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      background: '#2E3440',
      color: '#8FBCBB',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
      paddingBottom: theme.spacing(6),
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
    chevron: {
      color: "#D8DEE9"
    },
    chevronBackground: {
      '&:hover': {
        backgroundColor: '#3B4252',
      }
    },
    navLinks: {
      width: '100%',
      display: 'flex',
      flexFlow: 'row wrap',
      fontSize: "60px",
    },
    navRight: {
      flex: '0 0 0',
      textAlign: 'center',
      width: 100,
      paddingRight: 40,
    },
    navLeft: {
      flex: '0 0 0',
      textAlign: 'center',
      width: 100,
      paddingLeft: 40,
    },
    largeFont: {
      fontSize: '40px',
    },
    navSeparator: {
      flex: '1 0 0'
    },
    menuCurrent: {
      background: '#3B4252',
    }
  }),
)
let lsMenuOpen = true
if (typeof localStorage !== "undefined"
  && typeof localStorage["menu-open"] !== "undefined") {
    lsMenuOpen = JSON.parse(localStorage["menu-open"])
}

const renderMenuLink = ({title, link, code}) => {
  const location = useLocation()
  const classes = useStyles()
  return (
    <Link to={link} key={link}>
      <ListItem button className={link ===  location.pathname ? classes.menuCurrent : ""} >
      <ListItemText primary={code ? <code>{title}</code> : title} />
      </ListItem>
    </Link>
  )
}

const renderSection = ({name, children}, i) => (
  <span key={name || i}>
    <ListItem>
      {name !== "" ? (
        <Typography variant="h6" noWrap>
          {name}
        </Typography>
      ): ""}
    </ListItem>
    {children.map(renderMenuLink)}
    <Divider />
  </span>
)

const pageToNextMap = ({} as any)
const pageToPrevMap = ({} as any)
routes
  .reduce((acc, cur) => {
    return acc.concat((cur as any).children.map(({link}) => link))
  }, [])
  .forEach((cur, i, arr) => {
    if (arr.length - 1 !== i) {
      pageToNextMap[cur] = arr[i + 1]
    }
    if (i !== 0) {
      pageToPrevMap[cur] = arr[i - 1]
    }
  })
  

const getCmpt = (url) => {
  const classes:any = useStyles()
  const { pathname } = useLocation()
  return (
    <>
    {React.createElement(getMd(url))}
    <div className={classes.navLinks}>
    <div className={classes.navLeft}>
      <Link to={pageToPrevMap[pathname]}>
        <IconButton className={classes.largeFont}>
          <ChevronLeftIcon fontSize="inherit" className={classes.chevron} />
        </IconButton>
      </Link>
    </div>
    <div className={classes.navSeparator} />
    <div className={classes.navRight}>
      <Link to={pageToNextMap[pathname]}>
        <IconButton className={classes.largeFont}>
          <ChevronRightIcon fontSize="inherit" className={classes.chevron} />
        </IconButton>
      </Link>
    </div>
    </div>
    </>
  )
}
const renderSectionRoutes = ({children}) => children.map(renderRoute)
const renderRoute = ({cmpt, link}) => {
  return <Route exact path={link}>
    {getCmpt(cmpt)}
  </Route>
}


const App = () => {
  const [menuOpen, setMenuOpen] = useState(lsMenuOpen)
  const toggleMenuOpen = () => {
    localStorage["menu-open"] = !menuOpen
    setMenuOpen(!menuOpen)
  }
  const scrollPositionName = `scrollposition.${location.href}`
  
  const classes = useStyles()
  const listener = _ => {
    const bodyOffset = document.body.getBoundingClientRect().y
    if (typeof localStorage !== "undefined") {
      localStorage[scrollPositionName] = -bodyOffset
    }
  }
  
  useEffect(() => {
    window.addEventListener("scroll", listener)
    const savedPosition = localStorage[scrollPositionName]
    const maxLook = 100
    let curInc = 0
    if (savedPosition) {
      console.log('found saved position')
      const scroll = () => {
        if (curInc++ > maxLook) return
        if (getBodyHeight() < savedPosition) {
          setTimeout(scroll, 100)
        } else {
          window.scrollTo(0, savedPosition)
        }
      }
      scroll()
      setTimeout(() => {
      }, 300)
    } else {
      if (window.location.hash) {
        const scroll = () => {
          if (curInc++ > maxLook) return
          if (document.querySelector(window.location.hash)) {
            scrollToId(window.location.hash)
          } else {
            console.log('waiting')
            setTimeout(scroll, 100)
          }
        }
        scroll()
      }
    }
    return () => {
      window.removeEventListener("scroll", listener)
    }
  }, [location.pathname])
  
  
  return (
    <div>
      <AppBar
        position="fixed"
        color="secondary"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: menuOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={toggleMenuOpen}
            edge="start"
            className={clsx(classes.menuButton, menuOpen && classes.hide, classes.chevronBackground)}
          >
            <MenuIcon className={classes.chevron} />
          </IconButton>
          <Link to="/">
            <Typography variant="h6" noWrap>
              <span className={classes.white}>@zecos</span>
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={menuOpen}
        onClose={toggleMenuOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleMenuOpen} className={classes.chevronBackground}>
            <ChevronLeftIcon className={classes.chevron} />
          </IconButton>
        </div>
      <List>
        {routes.map(renderSection)}
      </List>
      </Drawer>
      <div className={classes.drawerHeader} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: menuOpen,
        })}
      >
        <Switch>
          {routes.map(renderSectionRoutes)}
        </Switch>
      </main>
    </div>
  )
}

export default App
