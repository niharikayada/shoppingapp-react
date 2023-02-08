import { Link } from 'react-router-dom';
export default function NavBar() {
    return (
        <div>
        <div className='flex justify-between bg-blue-900 py-4 text-white px-10 text-xl'>
            <div>
                <Link to='/'>Shopping Site</Link>   
            </div>
            <div>
                <Link to='/cart'>Cart</Link>
            </div>
        </div>
   </div>
    )
}