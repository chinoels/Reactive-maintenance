useEffect(() => {
  const fetchData = async () => {
    const res = await fetch('/api/add-request');
    const data = await res.json();
    setRequests(data);
  };
  fetchData();
}, []);
