import { Anchor } from 'antd';
import { Link, Outlet } from 'react-router-dom';

export const AdminNavigation = () => {
    const items = [
        {
            key: '1',
            href: 'dashboard',
            title: 'Dashboard'
        },
        {
            key: '2',
            href: '#on-going-transactions',
            title: 'On going transactions'
        },
        {
            key: '3',
            href: '#successfull-assumed',
            title: 'Successfully Assumed property'
        },
        {
            key: '4',
            href: 'dropped',
            title: 'Deleted property'
        }
    ]
    return <section>
        <Anchor
            items={items}
        />
        <Outlet />
    </section>
}