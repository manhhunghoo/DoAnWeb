import { FaSearch } from "react-icons/fa";
import { useEffect, useState, useRef } from 'react';
import Tooltip from "@mui/material/Tooltip";
import useDebounce from "../../hook/useDebounce";
import * as searchServices from "../../service/search";
import { Link } from "react-router-dom";

import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import { Avatar } from "@mui/material";
import useTime from "../../hook/useTime"

const LINK_IMAGE = 'https://th.bing.com/th/id/OIP.RopD45u-y2SjLUw0x5loNAHaI2?rs=1&pid=ImgDetMain';
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([''])
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            const result = await searchServices.search(debouncedValue);
            setLoading(true);
            if (result?.length > 0 && result)
                setSearchResult(result);
            else setSearchResult([]);
            setLoading(false)
        };

        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const GetLinkImage = (object) => {
        if (object.linkimage == '' || object.linkimage == null) {
            return LINK_IMAGE;
        }
        return object.linkimage;


    }
    return (
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                visible={showResult > 0 && searchResult.length > 0}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs} className="bg-white p-3 rounded-lg shadow-lg border border-blue-400">
                        <ul>
                            {searchResult.length > 0 && searchResult.map((result, index) => (
                                <li key={index} className="flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:border-blue-300 rounded cursor-pointer">
                                    <div>
                                        <Avatar src={GetLinkImage(result)} alt={`${result.description}-${result.title}-UITCourse`} />
                                    </div>
                                    <Link to={`/Khoahocpage/${result?._id}/${result?.owner}`}>
                                        <p className="font-semibold text-ellipsis line-clamp-1">{result.title}</p>
                                        <p className='text-sm text-ellipsis line-clamp-1' > <time >Create:{useTime(result.createdAt)}</time></p>
                                    </Link>
                                </li>
                            ))
                            }
                        </ul >
                    </div >
                )}
                onClickOutside={handleHideResult}
            >
                <div >

                    <input
                        type="text"
                        ref={inputRef}
                        value={searchValue}
                        className="mr-16 w-full px-4 py-2 shadow-lg rounded-3xl border-2 border-gray-300 pl-10 trancate outline-none"
                        placeholder="Tìm kiếm Khóa học, Tài liệu, Môn học,..."
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon icon={faSpinner} />}

                    <button onMouseDown={(e) => e.preventDefault()}>
                    </button>
                </div>
            </HeadlessTippy >
        </div >
    );
}

export default Search;
