type TJob = {
  id: string;
  createdTime: string;
  fields: {
    'Job ID': number,
    Posted: string,
    'Job Title': string,
    Company: string,
    Details: 'string',
    Location: string,
    Tags: string[],
    Img: {url: string}[],
    'Apply Link': string,
    'Company Website': string,
    'Posted Actual Time': string,
    Status: 'Active' | 'Closed',
    'Job Title + Company': string,
    Social: string;
  }
}

// "Job ID": 141,
// "Posted": "2024-02-06",
// "Posted Actual Time": "2024-02-06T12:09:00.000Z",
// "Status": "Active",
// "Job Title": "Operations Manager",
// "Company": "Saga",
// "Details": "Saga is the next iteration of a base protocol in web3 – hyper-focused on developer needs, and dedicated to ensuring blockspace is abundant and can be ...",
// "Location": "Global Remote",
// "Tags": [
//   "Operations"
// ],
// "Company Website": "https://www.saga.xyz",
// "Img": [
//   {
//     "url": "https://v5.airtableusercontent.com/v3/u/25/25/1707235200000/_Ktgl-pL8AsBUcmqOynwcw/t1riJmhpOZC0t245YOKpbFyc7YtkuKBjVMBFSZyBHpfehuQ-uTRfduGRVGb76CEakMXGmxVmUxouRoN4rqeIuF4RFgyfGGf8_VtAywaRBWNgfkJd7EUaJg1s8aJZLqrUZ3QV6kofutcysQ5XyP2Tgw/YJGQTz8DxZvfquZwF070736cIaGeXa2KVYj85DyNxwo"
//   }
// ],
// "Apply Link": "https://www.saga.xyz/careers/bdcb24e8-2307-43ad-ac44-44ff5ceec500"
// }