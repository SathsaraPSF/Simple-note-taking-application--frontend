import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import pin from '../assets/pin.png';

function NoteCard(props) {
    console.log(props.note)
    return (
        <div className='flex flex-wrap justify-center'>
            <div className='max-w-sm w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-2 my-4'>
                <div className='bg-white rounded-sm shadow-lg'>
                    <div className='flex justify-between items-center px-4 py-2 gap-5'>
                        <img src={pin} className='w-[25px] ' />
                        <h1 className='text-[0.8rem] font-bold'>{props.title}</h1>
                        <div className="flex gap-2">
                            <span className='text-[0.8rem]'>{props.date}</span>
                            <div className="flex min-[0px]:gap-3 sm:gap-2 items-center">
                                <FontAwesomeIcon icon={faEdit} size="xs" className="text-blue-500 min-[0px]:flex sm:hidden cursor-pointer" onClick={props.handleUpdate} />
                                <FontAwesomeIcon icon={faTrash} size="xs" className="text-red-500 min-[0px]:flex  sm:hidden cursor-pointer" onClick={props.handleDelete} />
                            </div>
                        </div>
                    </div>
                    <hr className='border-gray-300' />
                    <div className='px-4 py-2'>
                        <p className='text-[0.8rem]'>{props.note}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoteCard;