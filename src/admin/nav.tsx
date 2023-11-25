import { Anchor } from 'antd';
import { Outlet } from 'react-router-dom';

export const AdminNavigation = () => {
    const items = [
        {
            key: '1',
            href: 'dashboard',
            title: 'Dashboard'
        },
        {
            key: '2',
            href: 'on-going-transactions',
            title: 'On Going Transactions'
        },
        {
            key: '3',
            href: 'successfull-assumed',
            title: 'Successfully Assumed Property'
        },
        {
            key: '4',
            href: 'dropped',
            title: 'Deleted Property'
        },
        {
            key: '5',
            href: 'subscriptions',
            title: 'User Subscriptions'
        },
        {
            key: '6',
            href: 'feedbacks',
            title: 'User Feedbacks'
        },
        {
            key: '7',
            href: 'ratings',
            title: 'User Ratings'
        },
        {
            key: '8',
            href: 'unique',
            title: 'Unique'
        },
    ]
    return <div className="app-container">
        <section className="left-nav">
        <Anchor
            items={items}
        />
        </section>
        <section style={{width: '100%', marginLeft: '250px', padding: 10}}>
            <Outlet />
        </section>
    </div>
}