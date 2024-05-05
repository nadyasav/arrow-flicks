export async function request<T> (path: string): Promise<{ error: boolean, dataObj: T | null }> {
    const response = { error: false, dataObj: null };
    await fetch(path)
      .then( res => {
        if(res.status === 200){
          return res.json();
        } else {
          throw res;
        }
      })
      .then((json) => response.dataObj = json)
      .catch(async error => {
        console.log('error.status: ', error.status);
        response.error = true;
        if(error instanceof Response) {
          console.log('error.Response: ', await error.json());
        } else {
          console.log('error: ', { errorText: 'failed to fetch data' });
        }
      });

    return Promise.resolve(response);
}
