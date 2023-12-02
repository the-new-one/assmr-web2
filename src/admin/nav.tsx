// import { Anchor } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import '../css/onGoingCSS.css';
import { BarChartOutlined, DashboardOutlined, DeleteOutlined, DownOutlined, LikeOutlined, SnippetsOutlined, StarOutlined, TrophyOutlined, UsergroupAddOutlined } from '@ant-design/icons';

export const AdminNavigation = () => {
    const params = useLocation();

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
        <section className="left-nav" style={{zIndex: 4, marginTop: 100}}>
        {/* <Anchor
            items={items}
        /> */}
        {
            items.map((value: any, index: number) => {
                return <div className='admin-link'>
                    <div className='admin-container' style={{display: 'flex', flexDirection: 'row'}}>
                        {
                            value.title === 'Dashboard' && <DashboardOutlined style={{marginRight: 5, fontSize: 20, color: '#006d77'}} />
                        }
                        {
                            value.title === 'On Going Transactions' && <SnippetsOutlined style={{marginRight: 5, fontSize: 20, color: '#fc440f'}} />
                        }
                        {
                            value.title === 'Successfully Assumed Property' && <TrophyOutlined style={{marginRight: 5, fontSize: 20, color: '#dc851f'}} />
                        }
                        {
                            value.title === 'Deleted Property' && <DeleteOutlined style={{marginRight: 5, fontSize: 20, color: '#e94f37'}} />
                        }
                        {
                            value.title === 'User Subscriptions' && <LikeOutlined style={{marginRight: 5, fontSize: 20, color: '#a5cbc3',}} />
                        }
                        {
                            value.title === 'User Feedbacks' && <UsergroupAddOutlined style={{marginRight: 5, fontSize: 20, color: '#079e65'}} />
                        }
                        {
                            value.title === 'User Ratings' && <StarOutlined style={{justifySelf: 'center', alignSelf: 'center', marginRight: 5, color: 'gold', fontSize: 20}} />
                        }
                        {
                            value.title === 'Unique' && <BarChartOutlined style={{marginRight: 5, color: '#780116', fontSize: 20}} />
                        }
                        <a href={value.href}>{value.title}</a>
                    </div>
                </div>
            })
        }
        </section>
        <section style={{width: '100%'}}>
            <div style={{position: 'fixed', top: 0, zIndex: 5, width: '100%'}}>
                <div className='admin-header'>
                    <h4 style={{marginLeft: '20px', alignSelf: 'center', fontSize: 30}}>Welcome Admin</h4>
                </div>
            </div>
            <section style={{marginLeft: '250px', padding: 10, marginTop: 100}}>
                <Outlet />
            </section>
        </section>
    </div>
}