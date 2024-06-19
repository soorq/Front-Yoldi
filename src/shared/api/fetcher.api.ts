export const fetcher = async (url: string) =>
    fetch(url).then(data => data.json());
