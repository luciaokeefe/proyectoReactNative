


const searchFilterFunction = (text) => { // Check if searched text is not blank
  
    if (text) {

      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.title
              ? item.title.toUpperCase()
              : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      );
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };