import math
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
        sector = [[x1, y1], [x2, y2], [x3, y3], [x4, y4], [x5, y5], [x6, y6], [x1, y1]]
        return sector
    def GenHexGrid(width, hight, x0, y0, ForeignRadius):
        HexGrid = []

        i = 0
        j = 0
        while (j < hight):
            x00 = x0
            y00 = y0
            while i < width:
                part = grid.gen_sector(ForeignRadius, x0, y0)
                HexGrid.append(part)
                y0 = y0 + 2 * math.sqrt(3) * ForeignRadius
                i = i + 1
            x0 = x00 - 1.5 * ForeignRadius
            y0 = y00 - 0.5 * math.sqrt(3) * ForeignRadius * 2
            j = j + 1
            i = 0

        for a in HexGrid:
            print(a)
            print(',')

if __name__ == '__main__':
    x0 = 58.05591
    y0 = 56.21541
    ForeignRadius = 0.001
    grid.GenHexGrid(10, 10, x0, y0, ForeignRadius)


