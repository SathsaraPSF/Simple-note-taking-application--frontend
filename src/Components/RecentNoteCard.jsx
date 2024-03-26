import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function RecentNoteCard(props) {
    return (
        <div className='flex flex-wrap justify-center'>
            <div className='max-w-sm w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-2 my-4'>
                <div className='bg-white rounded-sm shadow-lg'>
                    <div className='flex justify-between items-center px-4 py-2'>
                        <h1 className='text-[0.6rem]'>{props.title}</h1>
                        <div className="flex gap-2">
                            <FontAwesomeIcon icon={faEdit} size="xs" className="text-blue-500 cursor-pointer" onClick={props.handleUpdate} />
                            <FontAwesomeIcon icon={faTrash} size="xs" className="text-red-500 cursor-pointer" onClick={props.handleDelete} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
