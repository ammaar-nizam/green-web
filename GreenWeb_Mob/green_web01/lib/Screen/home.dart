import 'package:flutter/material.dart';
import 'package:green_web01/Screen/complaint..dart';

class home extends StatelessWidget {
  //const homePage({super.key});
  var height, width;

  List imgSrc = ["images/complaint.jpg", "images/update.png"];
  List imgTitle = [
    "Complaints",
    "Status-Update",
  ];

  @override
  Widget build(BuildContext context) {
    height = MediaQuery.of(context).size.height;
    width = MediaQuery.of(context).size.width;
    return Scaffold(
        body: Container(
      color: Color.fromARGB(255, 4, 136, 11),
      height: height,
      width: width,
      child: Column(children: [
        Container(
          decoration: BoxDecoration(),
          height: height * 0.25,
          width: width,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: EdgeInsets.only(
                  top: 35,
                  left: 20,
                  right: 20,
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    InkWell(
                      onTap: () {},
                      child: Icon(
                        Icons.sort,
                        color: Colors.white,
                        size: 40,
                      ),
                    ),
                    ClipRRect(
                      child: Image.asset(
                        "images/man.png",
                        height: 50,
                        width: 50,
                      ),
                    )
                  ],
                ),
              ),
              Padding(
                padding: EdgeInsets.only(
                  top: 20,
                  left: 20,
                  right: 20,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Dashboard",
                      style: TextStyle(
                        fontSize: 30,
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                        letterSpacing: 1,
                      ),
                    )
                  ],
                ),
              )
            ],
          ),
        ),
        Container(
          decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(30),
                topRight: Radius.circular(30),
              )),
          height: height * 0.75,
          width: width,
          padding: EdgeInsets.symmetric(vertical: 70),
          child: GridView.builder(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              childAspectRatio: 1.1,
              mainAxisSpacing: 25,
            ),
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            itemCount: imgSrc.length,
            itemBuilder: ((context, index) {
              return InkWell(
                onTap: () {
                  Navigator.of(context).push(
                      MaterialPageRoute(builder: (context) => Complaint()));
                },
                child: Container(
                  margin: EdgeInsets.symmetric(vertical: 8, horizontal: 20),
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(15),
                      color: Colors.white,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black26,
                          spreadRadius: 1,
                          blurRadius: 6,
                        )
                      ]),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Image.asset(
                        imgSrc[index],
                        width: 100,
                      ),
                      Text(imgTitle[index]),
                    ],
                  ),
                ),
              );
            }),
          ),
        )
      ]),
    ));
  }
}
