import math
import random
class grid():
    def __init__(self, ForeignRadius, x0, y0):
        self.ForeignRadius = ForeignRadius
        self.x0 = x0
        self.y0 = y0
    def gen_sector(ForeignRadius, x0, y0):
        sin60 = -(math.sin(1.0472))
        x1 = x0 + ForeignRadius
        y1 = y0

        x2 = x0 + 0.5 * ForeignRadius
        y2 = y0 + sin60 * ForeignRadius*2

        y3 = y0 + sin60 * ForeignRadius*2
        x3 = x0 - 0.5 * ForeignRadius

        y4 = y0
        x4 = x0 - ForeignRadius

        y5 = y0 - sin60 * ForeignRadius*2
        x5 = x0 - 0.5 * ForeignRadius

        y6 = y0 - sin60 * ForeignRadius*2
        x6 = x0 + 0.5 * ForeignRadius
        sector = [[y1, x1], [y2, x2], [y3, x3], [y4, x4], [y5, x5], [y6, x6], [y1, x1]]
        return sector
    def GenHexGrid(width, hight, x0, y0, ForeignRadius):
        HexGrid = []
        OriginX0 = x0
        OriginY0 = y0
        i = 0
        j = 0
        while (j < hight):
            if(j % 2 == 0):
                y00 = OriginY0
            else:
                y00 = y0
            x00 = x0
            while i < width:
                part = grid.gen_sector(ForeignRadius, x0, y0)
                HexGrid.append(part)
                y0 = y0 + 2 * math.sqrt(3) * ForeignRadius
                i = i + 1
            x0 = x00 - 1.5 * ForeignRadius
            y0 = y00 - 0.5 * math.sqrt(3) * ForeignRadius * 2
            j = j + 1
            i = 0

        f = open('HexGrid.js', 'w')
        IdPol = 0
        statesData = 'var statesData = {"type":"FeatureCollection","features":['
        for CoordSector in HexGrid:
            IdPol += 1
            name = 'Pol{0}'.format(IdPol)
            density = random.randint(1, 3)
            statesData += '{{"type":"Feature","id":"{0}","properties":{{"name":"{1}","density":{2}}},"geometry":{{"type":"Polygon","coordinates":[{3}]}}}},\n'.format(IdPol, name, density, str(CoordSector))
        statesData += ']};'
        f.write(statesData)
        f.close()
if __name__ == '__main__':
    x0 = 58.0557
    y0 = 56.21721
    ForeignRadius = 0.00002
    grid.GenHexGrid(100, 100, x0, y0, ForeignRadius)



