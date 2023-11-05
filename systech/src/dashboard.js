import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './dashboard.css'; // Uncomment this line to import the default styles
import  DataExtraction from './tabs/Main';
import Tab1Content from './tabs/Tab1Content';
// import Tab1Content from './tabs/Main';
// import Tab2Content from './Tab2Content';
// import Tab3Content from './Tab3Content';
// import Tab4Content from './Tab4Content';
function Dashboard() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="tab-container">
      <Tabs selectedIndex={selectedTab} onSelect={tabIndex => setSelectedTab(tabIndex)}>
        <TabList className="tab-list">
          <Tab className="tab">Tab 1</Tab>
          <Tab className="tab">Tab 2</Tab>
          <Tab className="tab">Tab 3</Tab>
          <Tab className="tab">Tab 4</Tab>
        </TabList>

        <TabPanel>
        </TabPanel>
        <TabPanel>
          sf fhcsknnf
        </TabPanel>
        <TabPanel>
        <div>
        <DataExtraction/>
      <Tab1Content />
    </div>
          sfn bf
        </TabPanel>
        <TabPanel>
          dbcshbhbhb
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Dashboard;
