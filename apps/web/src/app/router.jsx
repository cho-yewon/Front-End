import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import Home from '../pages/Home'
import About from '../pages/About'
import Projects from '../pages/Projects'
import ProjectDetail from '../pages/ProjectDetail'
import Resume from '../pages/Resume'
import Contact from '../pages/Contact'


export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/about', element: <About /> },
            { path: '/projects', element: <Projects /> },
            { path: '/projects/:slug', element: <ProjectDetail /> },
            { path: '/resume', element: <Resume /> },
            { path: '/contact', element: <Contact /> },
        ],
    },
])