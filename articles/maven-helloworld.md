---
layout: page
title: Simple Maven Project
ispage: true
intro: The goal of this article is to demonstrate how to setup a simple maven project in Eclipse.
---


The goal of this article is to demonstrate how to setup a simple maven project in Eclipse.  
For more info about Maven itself please check [TODO: Maven Concepts]().  
The project source is provided at [samples/maven-helloworld](https://github.com/devsio/samples/tree/master/helloworld) 

Prerequirements:

* Installed Maven. If you haven't installed Maven yet check [TODO: Installing Maven]()
* Installed Eclipse. 
* Installed Maven plugin in Eclipse. Check [TODO: Installing Maven plugin]().

In order to create a new project select 

*File -> New -> Maven Project*   
or  
*File -> New -> Other --> Maven -> Maven Project*   

You should be asked to choose workspace location and whether you want to choose an [archetype](TODO: Maven Concepts#Archetypes). 
In case you selected to choose an archtype you'll be offered a list of available archetypes.  
maven-archtype-quickstart is best choice for simple maven powered java project.  

In the next step you need to define an appropriate [groupId, artifactId and version](TODO: Maven Concepts#Terminology) for your application.  
For the sake of the sample lets enter

{% highlight yaml %}
GroupId : io.devs.basic
ArtifactId : helloworld
Version: 0.0.1-SNAPSHOT
{% endhighlight %}

Afterwards Maven project should be generated.  

Please note the following structure  

{% highlight yaml %}
- src
  - main
    - java
  - test
    - java
- target
- pom.xml
{% endhighlight %}

src folder contains the source code of the project. target will contain executables that will be built and pom.xml configures the project.

The pom should roughly be simmilar to the following example. But just for the needs of this tutorial you can update to the following content

{% highlight xml %} 
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>io.devs.basic</groupId>
	<artifactId>helloworld</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>jar</packaging>

	<name>helloworld</name>
	<url>http://maven.apache.org</url>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<spring.version>4.1.5.RELEASE</spring.version>
	</properties>

	<build>
		<plugins>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-compiler-plugin</artifactId>
				<configuration>
					<source>1.8</source>
					<target>1.8</target>
				</configuration>
			</plugin>
		</plugins>
	</build>

	<dependencies>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>3.8.1</version>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-core</artifactId>
			<version>${spring.version}</version>
		</dependency>
	</dependencies>
</project>
{% endhighlight %} 


First items define projects groupId, artifactId and version. The packaging property defines that our deliverable will be a jar file.  
Properties node can be used to define some propertis that could be reused afterwards.  
The build part is used to tweak the building process of the project. For the current example we added maven-compiler-plugin in order to direct the maven to use Java 8.  

And last but not least the dependencies part. It's arguably one of the major reasons to use maven. Dependencies part defines list of libraries are needed for the services of the current project. Fortunately Maven is here to provide them for us.  

Building...  
Executing...  


For more info on the Maven itself you can visit our page [TODO: Maven Concepts]()   

Source can be fetched from [samples/maven-helloworld](https://github.com/devsio/samples/tree/master/helloworld)
