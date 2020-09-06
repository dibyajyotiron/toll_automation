1.  What routes should be there?

    - Logging in using a toll's token or using admin token, to ensure from which toll a vehicle got registered.
    - Creation of a toll by an admin only.
    - Create receipt for a given vrn for a given day!!
    - For a given receipt and type of direction (roundAllowed or one way, i.e north/south), check if a vehicle is allowed to pass!

2.  Tokens

    - x-app-token for app specific registration/validation
    - x-auth-token for login

3.  Size Considerations

    - TollBooth

      - \_id - 12 bytes
      - number - 8 bytes
      - zone - 4 bytes
      - createdAt - 4 bytes (AS BSON date is 64 bit int,i.e int64)
      - updatedAt - 4 bytes
      - \_\_v - 8 bytes

      - Avg size = 40 bytes / document (will differ from mongo's actual size due to their way of storing data in BSON and converting it to JSON for which sizes are not really specified in their docs, actual size can be +- 100 bytes)

    - Receipt

      - \_id - 12 bytes
      - \_tollBooth - 12 bytes
      - vrn - 10 bytes
      - validTill - 4 bytes
      - direction - 10 bytes (max)
      - createdAt - 4 bytes
      - updatedAt - 4 bytes
      - \_\_v - 8 bytes

      - Avg size = 64 bytes / document (Actual can be +- 100 bytes)

4.  Used Joi version 14 major, as 15 onwards apis have changed drastically!

5.  There are two types of tokens, admin tokens, and toll tokens. If a toll needs to be created, that can only be done by an admin, for better security, these tokens can be rotated every 24 hours, for simplicity, that is not present in the api. For logging in a toll, toll token needs to be specified, or admin token can also work, this way any raspberry pie system/third party systems can be integrated for automation without the need of human interference.

6.  ## Postman collection

    - https://documenter.getpostman.com/view/3985852/TVCiSRa3#bb7e4969-a59d-4ebc-9816-a3fc6c171c1f

7.  For running the app in windows 10, do `npm i`, followed by creation of .env file with `adminToken, tollToken, mongoURI` keys and proper values, then run npm run dev. For using linux/mac, run `npm run dev-linux`.
