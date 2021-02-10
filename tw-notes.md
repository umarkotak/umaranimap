# request

42["msg",…]
0: "msg"
1: {type: "ResourceDeposit/open", id: 29, headers: {traveltimes: [["browser_send", 1612964580602]]}}
headers: {traveltimes: [["browser_send", 1612964580602]]}
traveltimes: [["browser_send", 1612964580602]]
0: ["browser_send", 1612964580602]
0: "browser_send"
1: 1612964580602
id: 29
type: "ResourceDeposit/open"

# response

42["msg", {id: 29, type: "ResourceDeposit/info", headers: {,…},…}]
0: "msg"
1: {id: 29, type: "ResourceDeposit/info", headers: {,…},…}
data: {x: 438, y: 484, resources_left: 8263, resources_collected: 1737, time_next_reset: 1612971406,…}
jobs: [{id: 204810, resource_type: "clay", amount: 74, quality: 0, duration: 1260},…]
0: {id: 204810, resource_type: "clay", amount: 74, quality: 0, duration: 1260}
amount: 74
duration: 1260
id: 204810
quality: 0
resource_type: "clay"
1: {id: 204812, resource_type: "wood", amount: 154, quality: 0, duration: 240}
2: {id: 204813, resource_type: "wood", amount: 64, quality: 0, duration: 540}
3: {id: 204815, resource_type: "wood", amount: 152, quality: 0, duration: 180, time_completed: 1612962254}
milestones: [{goal: 250, reward: {item_type: "premium_officer_leader", amount: 5}, reached: true},…]
0: {goal: 250, reward: {item_type: "premium_officer_leader", amount: 5}, reached: true}
goal: 250
reached: true
reward: {item_type: "premium_officer_leader", amount: 5}
amount: 5
item_type: "premium_officer_leader"
1: {goal: 750, reward: {item_type: "premium_officer_leader", amount: 5}, reached: true}
2: {goal: 1500,…}
3: {goal: 3000, reward: {item_type: "reward_units", amount: 1, content: {spear: 60}}, reached: false}
4: {goal: 6000, reward: {item_type: "premium_build_cost_reduction", amount: 2}, reached: false}
5: {goal: 10000, reward: {item_type: "reward_units", amount: 1, content: {sword: 100}}, reached: false}
resources_collected: 1737
resources_left: 8263
time_new_milestones: 1612971406
time_next_reset: 1612971406
x: 438
y: 484
headers: {,…}
traveltimes: [["browser_send", 1612964580602], ["node_receive", 1612964580718], ["worker_start", 1612964580723],…]
0: ["browser_send", 1612964580602]
1: ["node_receive", 1612964580718]
2: ["worker_start", 1612964580723]
3: ["worker_response", 1612964580725]
4: ["worker_deliver", 1612964580725]
5: ["node_deliver", 1612964580731]
id: 29
type: "ResourceDeposit/info"

---

# request

42["msg", {type: "ResourceDeposit/collect", data: {job_id: 204815, village_id: 4744}, id: 30,…}]
0: "msg"
1: {type: "ResourceDeposit/collect", data: {job_id: 204815, village_id: 4744}, id: 30,…}
data: {job_id: 204815, village_id: 4744}
job_id: 204815
village_id: 4744
headers: {traveltimes: [["browser_send", 1612964683558]]}
traveltimes: [["browser_send", 1612964683558]]
0: ["browser_send", 1612964683558]
id: 30
type: "ResourceDeposit/collect"

# response

42["msg", {id: null, type: "Village/resourcesChanged",…}]
0: "msg"
1: {id: null, type: "Village/resourcesChanged",…}
data: {villageId: 4744, res_last_update: 1612964683, storage: 22176, base_storage: 22176,…}
base_storage: 22176
building_queue_slots: 3
loyalty: 100
production_rates: {wood: 807.7216240398884, clay: 673.1013533665737, iron: 673.1013533665737}
clay: 673.1013533665737
iron: 673.1013533665737
wood: 807.7216240398884
res_last_update: 1612964683
resources: {wood: 5686, clay: 7573, iron: 3958, food: 53}
clay: 7573
food: 53
iron: 3958
wood: 5686
storage: 22176
villageId: 4744
headers: {traveltimes: [["worker_deliver", 1612964683676], ["node_deliver", 1612964683685]]}
traveltimes: [["worker_deliver", 1612964683676], ["node_deliver", 1612964683685]]
id: null
type: "Village/resourcesChanged"

42["msg", {id: 30, type: "ResourceDeposit/collected", headers: {,…},…}]
0: "msg"
1: {id: 30, type: "ResourceDeposit/collected", headers: {,…},…}
data: {job_id: 204815, resources_left: 8111, milestones_reached: []}
job_id: 204815
milestones_reached: []
resources_left: 8111
headers: {,…}
traveltimes: [["browser_send", 1612964683558], ["node_receive", 1612964683656], ["worker_start", 1612964683670],…]
id: 30
type: "ResourceDeposit/collected"

---

# request

42["msg", {type: "ResourceDeposit/startJob", data: {job_id: 204812}, id: 31,…}]
0: "msg"
1: {type: "ResourceDeposit/startJob", data: {job_id: 204812}, id: 31,…}
data: {job_id: 204812}
job_id: 204812
headers: {traveltimes: [["browser_send", 1612964765064]]}
id: 31
type: "ResourceDeposit/startJob"

# response

42["msg", {id: 31, type: "ResourceDeposit/jobStarted", headers: {,…},…}]
0: "msg"
1: {id: 31, type: "ResourceDeposit/jobStarted", headers: {,…},…}
data: {job_id: 204812, time_completed: 1612965005}
job_id: 204812
time_completed: 1612965005
headers: {,…}
id: 31
type: "ResourceDeposit/jobStarted"

---

# request

42["msg",…]
0: "msg"
1: {type: "ResourceDeposit/open", id: 32, headers: {traveltimes: [["browser_send", 1612964794602]]}}
headers: {traveltimes: [["browser_send", 1612964794602]]}
traveltimes: [["browser_send", 1612964794602]]
0: ["browser_send", 1612964794602]
id: 32
type: "ResourceDeposit/open"

# response

42["msg", {id: 32, type: "ResourceDeposit/info", headers: {,…},…}]
0: "msg"
1: {id: 32, type: "ResourceDeposit/info", headers: {,…},…}
data: {x: 438, y: 484, resources_left: 8111, resources_collected: 1889, time_next_reset: 1612971406,…}
jobs: [{id: 204810, resource_type: "clay", amount: 74, quality: 0, duration: 1260},…]
0: {id: 204810, resource_type: "clay", amount: 74, quality: 0, duration: 1260}
amount: 74
duration: 1260
id: 204810
quality: 0
resource_type: "clay"
1: {id: 204812, resource_type: "wood", amount: 154, quality: 0, duration: 240, time_completed: 1612965005}
amount: 154
duration: 240
id: 204812
quality: 0
resource_type: "wood"
time_completed: 1612965005
2: {id: 204813, resource_type: "wood", amount: 64, quality: 0, duration: 540}
amount: 64
duration: 540
id: 204813
quality: 0
resource_type: "wood"
milestones: [{goal: 250, reward: {item_type: "premium_officer_leader", amount: 5}, reached: true},…]
0: {goal: 250, reward: {item_type: "premium_officer_leader", amount: 5}, reached: true}
1: {goal: 750, reward: {item_type: "premium_officer_leader", amount: 5}, reached: true}
2: {goal: 1500,…}
3: {goal: 3000, reward: {item_type: "reward_units", amount: 1, content: {spear: 60}}, reached: false}
4: {goal: 6000, reward: {item_type: "premium_build_cost_reduction", amount: 2}, reached: false}
5: {goal: 10000, reward: {item_type: "reward_units", amount: 1, content: {sword: 100}}, reached: false}
resources_collected: 1889
resources_left: 8111
time_new_milestones: 1612971406
time_next_reset: 1612971406
x: 438
y: 484
headers: {,…}
id: 32
type: "ResourceDeposit/info"

42["msg", {id: 74, type: "ResourceDeposit/info", headers: {,…},…}]
0: "msg"
1: {id: 74, type: "ResourceDeposit/info", headers: {,…},…}
data: {x: 438, y: 484, resources_left: 8111, resources_collected: 1889, time_next_reset: 1612971406,…}
jobs: [{id: 204810, resource_type: "clay", amount: 74, quality: 0, duration: 1260},…]
0: {id: 204810, resource_type: "clay", amount: 74, quality: 0, duration: 1260}
amount: 74
duration: 1260
id: 204810
quality: 0
resource_type: "clay"
1: {id: 204812, resource_type: "wood", amount: 154, quality: 0, duration: 240, time_completed: 1612965005}
amount: 154
duration: 240
id: 204812
quality: 0
resource_type: "wood"
time_completed: 1612965005
2: {id: 204813, resource_type: "wood", amount: 64, quality: 0, duration: 540}
amount: 64
duration: 540
id: 204813
quality: 0
resource_type: "wood"
milestones: [{goal: 250, reward: {item_type: "premium_officer_leader", amount: 5}, reached: true},…]
resources_collected: 1889
resources_left: 8111
time_new_milestones: 1612971406
time_next_reset: 1612971406
x: 438
y: 484
headers: {,…}
id: 74
type: "ResourceDeposit/info"