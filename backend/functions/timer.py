import time


def stopwatch():
    start_time = time.time()
    go = True
    i = 0
    while go:
        time.sleep(1)
        time_lapsed = time.time() - start_time
        i += 1
        time_convert(time_lapsed)

        if i == 10:
            break


def time_convert(sec):
    mins = sec // 60
    sec = sec % 60
    hours = mins // 60
    mins = mins % 60
    print("Time Lapsed = {0}:{1}:{2}".format(int(hours), int(mins), int(sec)))
    return int(hours), int(mins), int(sec)


if __name__ == '__main__':
    stopwatch()

# input("Press Enter to start")
# start_time = time.time()

# i = 0

# while True:
#     time.sleep(1)
#     time_lapsed = time.time() - start_time
#     i += 1
#     time_convert(time_lapsed)

#     if i == 10:
#         break


# input("Press Enter to stop")
# end_time = time.time()
# time_lapsed = end_time - start_time
# time_convert(time_lapsed)
