export const getSearchTextHighlighted = (searchValue: string, text: string) => {
    const str = text.split(new RegExp(`(${searchValue})`, 'gi'));

    return (
      <span>
        {searchValue
          ? str.map((part, index) =>
              part.toLowerCase() === searchValue.toLowerCase() ? (
                <span key={index} className='highlighted'>
                  {part}
                </span>
              ) : (
                part
              )
            )
          : text}
      </span>
    );
};
