subject_name <- c("Jon Doe", "Jane Doe", "Markus")
temperature <- c(37.0,37.4,40.0) 
flu_status <- c(FALSE,FALSE,TRUE) 

# Print all subject names except the first
subject_name[-1]

# Print all subject names except the first and second
subject_name[c(-1,-2)]

# FACTORS


food <- factor(c("low", "high", "medium", "high", "low", "medium", "high"))

# levels are by default in alphabetic order

levels(food)

# explicitly assigning the levels

food <- factor(food, levels = c("low", "medium", "high"))

levels(food)

min(food) # doesn't work 

# order the elements acc to levels

food <- factor(food, levels = c("low", "medium", "high"), ordered = TRUE)

# once we order we can compare elements

food[1] < food[2]

min(food)


symptoms <- factor (c("SEVERE", "MILD", "MODERATE"), levels = c("MILD", "MODERATE", "SEVERE"),
                    ordered=TRUE) 

# returns a vector of TRUE and FALSE values
symptoms > "MILD"

# display 1st and 3rd elems
symptoms[c(TRUE, FALSE, TRUE)]


# Print all subject names who have more than MILD symptoms
subject_name[symptoms>"MILD"]

# -------------------------------------------------------------------------------

# LISTS

# As vectors, a collection of elements, but not every element needs to be of the same type. 
# Entries in lists can be addressed using a name for each field (or by number as in vectors).
# A list in R is like a dict in python


subject1 <- list(fullname = "Markus", temperature = 40.0, symptoms = symptoms[1])

subject1

# We can access fields in a list via the "$" separator

subject1$fullname

# accessing several elems

subject1[c("fullname", "temperature")]
