import codecs
import json
import warnings
from datetime import date, datetime, timedelta

import matplotlib.pyplot as plt
import numpy as np
from netCDF4 import Dataset
from scipy.ndimage.filters import gaussian_filter1d

warnings.filterwarnings("ignore", category=DeprecationWarning)

ref_date = datetime(1900, 1, 1)

nc_file = './data/cmems_mod_arc_phy_anfc_nextsim_hm_1636243599230.nc'
data = Dataset(nc_file, mode='r')
lon = data.variables['longitude'][:]
lat = data.variables['latitude'][:]
time = np.array([ref_date + timedelta(days=t) for t in data.variables['time'][:]])

thickness = np.array(data.variables['sithick'][:])
thickness = np.where(thickness < 0, 0, thickness)[:]

mean_thickness = [np.mean(x) for x in thickness]

# thickness[0] - to for the first band
thickness_1 = thickness[0]
concatenated_data = []
for t, la, lo in zip(thickness_1, lat, lon):
    cell = list(zip(t, la, lo))
    concatenated_data = concatenated_data + cell

final_data = list(filter(lambda x: x[0] != 0, concatenated_data))
final_data = [{"thickness": s[0], "latitude": s[1], "longitude": s[2]} for s in final_data]

# test
# n = 0
# for i in final_data:
#     n = n + 1
#     print(n, ', ', i['latitude'], ', ', i['longitude'])


# GENERATE JSON
json.dump(final_data, codecs.open('./output/data-' + str(date.today()) + '.json', 'w', encoding='utf-8'), separators=(',', ':'), sort_keys=True, indent=4)


#PLOT CHART
ysmoothed = gaussian_filter1d(mean_thickness, sigma=6)
plt.plot(time, ysmoothed)
plt.xlabel('Time')
plt.ylabel('Thickness')
plt.title('Average ice thickness in time')
# plt.show()
plt.savefig('./output/chart-' + str(date.today()) +'.png', bbox_inches='tight')
