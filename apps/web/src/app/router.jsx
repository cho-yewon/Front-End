import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import ProjectDetail from '../pages/ProjectDetail'
import CoverLetter from '../pages/CoverLetter'
import Resume from '../pages/Resume'
import Contact from '../pages/Contact'

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/resume', element: <Resume /> },
            { path: '/projects', element: <Projects /> },
            { path: '/projects/:slug', element: <ProjectDetail /> },
            { path: '/coverletter', element: <CoverLetter /> },
            { path: '/contact', element: <Contact /> },
        ],
    },
])