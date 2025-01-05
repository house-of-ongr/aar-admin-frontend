import React, { useState } from 'react'
import SearchIcon from './icons/SearchIcon';

type SearchProp = {
    onSearch: (filter: string, query: string) => void;
}

export default function SearchComponent({ onSearch }: SearchProp) {
    const [filter, setFilter] = useState<string>('all');
    const [query, setQuery] = useState<string>('');

    const searchHandler = () => {
        onSearch(filter, query);
    };
    return (


        <div className="flex flex-col md:flex-row items-center gap-2 py-1 px-2 bg-white ">
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2"
            >
                <option value="all">전체</option>
                <option value="name">하우스명</option>
                <option value="designer">작가명</option>
            </select>

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f5946d]"
            />
            <SearchIcon onClick={searchHandler} />

        </div>
    )
}
